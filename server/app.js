// App.js

const express = require("express"); // We are using the express library for the web server
const cors = require("cors");
const cookieParser = require('cookie-parser');

const homeRoutes = require("./routes/index");
const userRoutes = require("./routes/users");
const jobRoutes = require("./routes/jobs");

const app = express() // We need to instantiate an express object to interact with the server in our code
// PORT = 4000 // Set a port number at the top so it's easy to change in the future

const {authenticateAccessToken} = require('./middleware/authenticateToken');

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(authenticateAccessToken);
const bcryptjs = require("bcryptjs");
app.use("/api/", homeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);

module.exports = app;