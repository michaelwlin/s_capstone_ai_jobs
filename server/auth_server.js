// App.js

const express = require("express"); // We are using the express library for the web server
const cors = require("cors");

const homeRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");

const auth_server = express() // We need to instantiate an express object to interact with the server in our code

auth_server.use(cors());
auth_server.use(express.json());
const bcryptjs = require("bcryptjs");
auth_server.use("/api/", homeRoutes);
auth_server.use("/api/auth", authRoutes);

module.exports = auth_server;