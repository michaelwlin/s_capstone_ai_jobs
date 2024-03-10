require('dotenv').config();
const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/refreshtokens');

async function authenticateRefreshToken(req, res, next) {
    const token = req.cookies['refreshToken'];
    if (!token) return res.sendStatus(401);

    try {
        const refreshToken = await RefreshToken.findOne({ "token": token });
        if (!refreshToken) {
            return res.sendStatus(401);
        } else {
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, userPayload) => {
                if (err) return res.sendStatus(403); // Invalid refresh token

                req.userPayload = userPayload; // Attach user payload to request
                next();
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred: ' + error.message);
    }

}

async function authenticateAccessToken(req, res, next) {
    const token = req.cookies['accessToken'];
    if (!token) {
        return res.sendStatus(401); // No token provided
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                // Token expired, attempt to refresh
                return authenticateRefreshToken(req, res, next);
            } else {
                return res.sendStatus(403);
            }
        }

        req.user = user;
        next();
    });
}

module.exports = { authenticateAccessToken, authenticateRefreshToken };