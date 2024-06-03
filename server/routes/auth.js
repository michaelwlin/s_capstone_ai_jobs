require('dotenv').config();

const express = require("express");
const { authenticateAccessToken, authenticateRefreshToken } = require("../middleware/authenticateToken");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require("../middleware/generateAccessToken");
const RefreshToken = require('../models/refreshtokens');
const router = express.Router();
const saltRounds = 10;


router.post("/register", async (req, res) => {
    const { userName, password, email, premiumUser } = req.body;
    if (!userName || !password) {
        return res.status(400).send("Username and password are required.");
    }

    try {
        const hashedPassword = await bcryptjs.hash(password, saltRounds);

        const user = new User({
            userName,
            password: hashedPassword,
            email,
            premiumUser,

        });

        await user.save();

        const userResponse = {
            ...user.toObject(),
            password: undefined,
        };

        res.status(201).send(userResponse);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user.");
    }
});

router.get("/loggedInData", authenticateAccessToken, async (req, res) => {
    const user = await User.findById(req.user.userId);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.json(user);
});

router.post("/logout", async (req, res) => {
    const refreshToken = req.cookies['refreshToken'];
    const accessToken = req.cookies['accessToken'];

    if (!refreshToken) {
        return res.status(400).send("Token not provided.");
    }

    try {
        const result = await RefreshToken.deleteOne({ token: refreshToken });

        if (result.deletedCount === 0) {
            console.log("Token not found for delete")
            return res.status(404).send("Token not found.");
        }
        else {
            // Clear the refresh token cookie
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: true, // Set to true only in production
                path: '/', // Ensure cookie is valid for all paths
            });

            res.clearCookie('accessToken', {
                httpOnly: true,
                secure: true, // Set to true only in production
                path: '/', // Ensure cookie is valid for all paths
            });

            res.send("Logged out successfully.");
        }




    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).send("An error occurred during logout.");
    }

}

);



router.post('/validate', async (req, res) => {
    const token = req.cookies['accessToken'];
    if (!token) {
        return res.sendStatus(401); // No token provided
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) {
            // If token expired or any other error
            if (err.name === 'TokenExpiredError') {
                try {
                    const newUser = await authenticateRefreshToken();
                    if (!newUser) {
                        return res.sendStatus(401).json({ isAuthenticated: false }); // Token expired
                    } else {
                        generateAccessToken(newUser, res);
                        return res.json({ isAuthenticated: true, user: newUser.userName, userId: newUser.userId.toString() });
                    }
                } catch (refreshError) {
                    console.error(refreshError);
                    return res.status(500).send('Error refreshing token').json({ isAuthenticated: false });
                }
            } else {
                return res.sendStatus(403).json({ isAuthenticated: false }); // Invalid token
            }
        } else {
            return res.json({ isAuthenticated: true, user: user.userName, userId: user.userId });
        }
    });
});


router.post('/login', async (req, res) => {
    const user = await User.findOne({ "userName": req.body.userName });
    if (user == null) {
        return res.status(400).send('Cannot find user');
    }
    else {
        try {
            if (await bcryptjs.compare(req.body.password, user.password)) {
                const userPayload = { userName: user.userName, userId: user._id.toString() };

                generateAccessToken(userPayload, res);
                const refreshToken = await generateRefreshToken(userPayload, res);


                res.status(200).send('Login Successful');

            } else {
                res.status(401).send('Unauthorized');
            }

        }
        catch (error) {
            console.error(error);
            res.status(500).send('An error occurred: ' + error.message);
        }
    }

});

router.post("/change_password", authenticateAccessToken, async (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).send("User not found.");
    }

    const passwordIsValid = await bcryptjs.compare(currentPassword, user.password);
    if (!passwordIsValid) {
        return res.status(403).send("Current password is incorrect.");
    }

    const hashedNewPassword = await bcryptjs.hash(newPassword, saltRounds);
    user.password = hashedNewPassword;
    await user.save();

    res.send("Password updated successfully.");
});


module.exports = router;