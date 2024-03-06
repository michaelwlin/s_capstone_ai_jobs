require('dotenv').config();

const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require("../middleware/generateAccessToken");
const RefreshToken = require('../models/refreshtokens');
888
const router = express.Router();


router.get("/loggedInData", authenticateToken, async (req, res) => {
    const user = await User.findById(req.user.userId);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.json(user);
});

router.post("/logout", async (req, res) => {
    const userToken = req.body.token;

    if (!userToken) {
        return res.status(400).send("Token not provided.");
    }

    try {
        const result = await RefreshToken.deleteOne({ token: userToken });

        if (result.deletedCount === 0) {
            return res.status(404).send("Token not found.");
        }
        res.send("Logged out successfully.");

    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).send("An error occurred during logout.");
    }

}

    // Check if a token was actually found and deleted


);

// router.get("/", (req, res) => {
//     res.send("<h1>Api2 is running!!!</h1>");
// });

router.get("/", async (req, res) => {
    console.log("You got here!")
    const tokens = await RefreshToken.find().sort("token");
    res.send(tokens);
});

router.post('/token', async (req, res) => {
    if (req.body.token == null) return res.sendStatus(401);
    try {
        const refreshToken = await RefreshToken.findOne({ "token": req.body.token });
        console.log("Received token:", req.body.token);
        console.log("refreshToken is", refreshToken.token);
        if (refreshToken == null) return res.sendStatus(403);
        jwt.verify(refreshToken.token, process.env.REFRESH_TOKEN_SECRET, (err, userPayload) => {
            if (err) return res.sendStatus(403)
            const accessToken = generateAccessToken({ userId: userPayload.userId })
            res.json({ accessToken: accessToken })
        })

    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred: ' + error.message);
    }

})

router.post('/login', async (req, res) => {
    const user = await User.findOne({ "userName": req.body.userName });
    if (user == null) {
        return res.status(400).send('Cannot find user');
    }
    else {
        try {
            if (await bcryptjs.compare(req.body.password, user.password)) {
                const userPayload = { userId: user._id };
                const accessToken = generateAccessToken(userPayload);
                const refreshToken = generateRefreshToken(userPayload);

               
                const refreshExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // day - hour - minute - second - millisecond
                const accessExpires = new Date(Date.now() + 15 * 60 * 1000); // day - hour - minute - second - millisecond
                
                await new RefreshToken({
                    user: user._id,
                    token: refreshToken, // Consider hashing
                    expires: refreshExpires
                }).save();

                res.cookie('accessToken', accessToken, {
                    httpOnly: true,
                    secure: true,
                    expires: accessExpires
                });

                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: true,
                    expires: refreshExpires
                });

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