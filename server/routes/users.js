require('dotenv').config();

const express = require("express");
const validateID = require("../middleware/validateID");
const { authenticateAccessToken, authenticateRefreshToken } = require("../middleware/authenticateToken");
const User = require("../models/user");
const router = express.Router();

router.get("/", async (req, res) => {
    const users = await User.find().sort("userName");
    res.send(users);
});

router.get("/loggedInData", authenticateAccessToken, async (req, res) => {
    const user = await User.findById(req.user.userId);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.json(user);
});
// router.get("/:id", validateID, async (req, res) => {
router.get("/:id", async (req, res) => {
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
router.get("/:id/skills", async (req, res) => {
    // router.get("/:id/skills", validateID, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send('User not found');

        res.json(user.skills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;