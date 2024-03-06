require('dotenv').config();
const jwt = require('jsonwebtoken');
const authenticateRefreshToken = require('./authenticateRefreshToken')

async function authenticateToken(req, res, next) {
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

module.exports = authenticateToken;