require('dotenv').config();

const express = require("express");
const validateID = require("../middleware/validateID");
const { authenticateAccessToken, authenticateRefreshToken } = require("../middleware/authenticateToken");
const User = require("../models/user");
const router = express.Router();
const { ObjectId } = require('mongoose').Types;

router.get("/", async (req, res) => {
    const { userName, email, role, _id } = req.query;
    let query = {};

    if (userName) {
        query.userName = userName;
    }

    if (email) {
        query.email = email;
    }

    if (role) {
        query.role = role;
    }

    if (_id) {
        if (ObjectId.isValid(_id)) {
            query._id = _id;
        } else {
            return res.status(400).send("Invalid _id format");
        }
    }

    try {
        let users;

        if (Object.keys(query).length > 0) {
            users = await User.find(query).sort("userName");
        } else {
            users = await User.find().sort("userName");
        }

        return res.send(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).send("Internal server error");
    }
});

router.get("/loggedInData", authenticateAccessToken, async (req, res) => {
    const user = await User.findById(req.user.userId);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.json(user);
});
router.get("/:id", validateID, async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send();
    res.send(user);
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send("User ID is required.");
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
        return res.status(404).send("User not found.");
    }

    res.status(204).send();

});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).send("User not found.");
        }
        res.send(updatedUser);
    } catch (error) {
        res.status(400).send("Error updating user: " + error.message);
    }
});


module.exports = router;