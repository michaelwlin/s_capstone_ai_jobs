require('dotenv').config();

const express = require("express");
const { authenticateAccessToken, authenticateRefreshToken } = require("../middleware/authenticateToken");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require("../middleware/generateAccessToken");
const RefreshToken = require('../models/refreshtokens');
const router = express.Router();


router.get("/loggedInData", authenticateAccessToken, async (req, res) => {
    const user = await User.findById(req.user.userId);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.json(user);
});

router.post("/logout", async (req, res) => {
    const userToken = req.cookies['refreshToken'];

    if (!userToken) {
        return res.status(400).send("Token not provided.");
    }

    try {
        const result = await RefreshToken.deleteOne({ token: userToken });

        if (result.deletedCount === 0) {
            return res.status(404).send("Token not found.");
        }

        // Clear the refresh token cookie
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
        });

        res.send("Logged out successfully.");

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
                    const user = await authenticateRefreshToken();
                    if (!user) {
                        return res.sendStatus(401); // Token expired
                    } else {
                        generateAccessToken(user, res);
                        return res.json({ isAuthenticated: true, user: user.userName });
                    }
                } catch (refreshError) {
                    console.error(refreshError);
                    return res.status(500).send('Error refreshing token')
                }
            } else {
                return res.sendStatus(403); // Invalid token
            }
        } else {
            res.json({ isAuthenticated: true, user: user });
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
                const userPayload = { userId: user._id };
                console.log("this is auth.js", user._id, userPayload)
                generateAccessToken(userPayload, res);
                const refreshToken = await generateRefreshToken(userPayload, res);


                console.log("refresh = ", refreshToken)
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



module.exports = router;