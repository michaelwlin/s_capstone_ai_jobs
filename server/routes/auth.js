require('dotenv').config();

const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require("../middleware/generateAccessToken");
const RefreshToken = require('../models/refreshtokens');

const router = express.Router();


router.get("/loggedInData", authenticateToken, async (req, res) => {
    const user = await User.findById(req.user.userId);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.json(user);
});

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
    const refreshToken = await RefreshToken.findOne({ "token": req.body.token });
    console.log("Received token:", req.body.token);
    console.log("refreshToken is", refreshToken.token);
    if (refreshToken == null) return res.sendStatus(403);
    jwt.verify(refreshToken.token, process.env.REFRESH_TOKEN_SECRET, (err, userPayload) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ userId: userPayload.userId })
        res.json({ accessToken: accessToken })
    })


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

                // const hashedRefreshToken = await bcryptjs.hash(refreshToken, 10);
                console.log(accessToken, refreshToken);
                const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // day - hour - minute - second - millisecond
                await new RefreshToken({
                    user: user._id,
                    token: refreshToken, // Consider hashing
                    expires: expires
                }).save();

                console.log("You win!")

                res.json({ accessToken: accessToken, refreshToken: refreshToken });

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