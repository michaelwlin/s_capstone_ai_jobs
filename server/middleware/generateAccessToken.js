require('dotenv').config();
const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/refreshtokens');

function generateAccessToken(userPayload, res) {
  const accessToken = jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const accessExpires = new Date(Date.now() + 15 * 60 * 1000); // minute - second - millisecond

  // Set the refresh token as an HttpOnly cookie
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    expires: accessExpires,
  });

  return accessToken;
}

async function generateRefreshToken(userPayload, res) {

  try {
    await RefreshToken.deleteMany({ "user.userId": userPayload.userId });


    const refreshToken = jwt.sign(userPayload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    const refreshExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // day - hour - minute - second - millisecond

    console.log(userPayload)

    await new RefreshToken({
      user: userPayload,
      token: refreshToken, // Consider hashing
      expires: refreshExpires
    }).save();

    // Set the refresh token as an HttpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      expires: refreshExpires,
    });

    return refreshToken;
  }
  catch (err) {
    console.error("Error deleting existing or creating new refresh tokens:", err);
  }
}
module.exports = { generateAccessToken, generateRefreshToken };