// App.js

const express = require("express"); // We are using the express library for the web server
const cors = require("cors");
const homeRoutes = require("./routes/index");
const userRoutes = require("./routes/users");

const app = express() // We need to instantiate an express object to interact with the server in our code
// PORT = 4000 // Set a port number at the top so it's easy to change in the future

app.use(cors());
app.use(express.json());
app.use("/api/", homeRoutes);
app.use("/api/users", userRoutes);

module.exports = app;