// CombinedServer.js

const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');

// Import Routes
const homeRoutes = require("./routes/index");
const userRoutes = require("./routes/users");
const jobRoutes = require("./routes/jobs");
const authRoutes = require("./routes/auth");

// Authentication Middleware
const { authenticateAccessToken } = require('./middleware/authenticateToken');

const allowedOrigins = ['http://localhost:3000', 'https://matchiq-client-803d913faaf2.herokuapp.com'];

const app = express();

app.use(cookieParser());
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(express.json());

// Open Routes
const openRoutes = ['/api/jobs', '/api/auth'];
const openHomeRoute = ['/api', '/api/'];

const handleRouteProtection = (req, res, next) => {
    if (openHomeRoute.some(route => req.path.endsWith(route)) || openRoutes.some(route => req.path.startsWith(route))) {
        next();
    } else {
        authenticateAccessToken(req, res, next);
    }
};

app.use(handleRouteProtection);

// Register Routes
app.use("/api/", homeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;