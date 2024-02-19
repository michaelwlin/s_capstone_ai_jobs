const express = require("express");
const validateID = require("../middleware/validateID");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;

router.get("/", async (req, res) => {
    const users = await User.find().sort("userName");
    res.send(users);
});

router.get("/:id", validateID, async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send();
    res.send(user);
});

router.post("/", async (req, res) => {
    const { userName, password, email, premiumUser, firstName, lastName } = req.body;
    
    if (!userName || !password) {
        return res.status(400).send("Username and password are required.");
    }

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new User({
            userName,
            password: hashedPassword,
            email,
            premiumUser,
            firstName,
            lastName,
        });

        await user.save();

        const userResponse = {
            ...user.toObject(),
            password: undefined,
        };

        res.status(201).send(userResponse);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user.");
    }
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