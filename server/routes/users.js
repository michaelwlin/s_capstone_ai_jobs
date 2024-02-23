require('dotenv').config();

const express = require("express");
const validateID = require("../middleware/validateID");
const authenticateToken = require("../middleware/authenticateToken");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get("/", async (req, res) => {
    const users = await User.find().sort("userName");
    res.send(users);
});

router.get("/loggedInData", authenticateToken, async (req, res) => {
    const user = await User.findById(req.user.userId);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.json(user);
});
router.get("/:id", validateID, async (req, res) => {
    const users = await User.findById(req.params.id);
    if (!user) return res.status(404).send();
    res.send(user);
});

router.post("/", async (req, res) => {
    if (!req.body.userName) return res.status(400).send("user name is required.");
    if (await User.findOne({ "userName": req.body.userName }) != null) {
        return res.status(400).send('User name unavailable. Please try another.');
    }
    else {
        try {
            // const salt = await bcryptjs.genSalt();
            // const hashedPassword = await bcryptjs.hash(req.body.password, salt);
            // instead of creating a salt, the salt variable can just be given the number of 
            // rounds we want which is 10 in this case.
            const hashedPassword = await bcryptjs.hash(req.body.password, 10);
            const user = new User({ userName: req.body.userName, role: "New", password: hashedPassword })
            await user.save();
            res.status(201).send(user);
        }
        catch (error) {
            console.error(error);
            res.status(500).send('An error occurred: ' + error.message);
        }
    }


});

router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user)
            return res.status(404).send("User ID not found.");

        res.status(204).send();
    } catch (error) {
        res.status(500).send();
    }
});



module.exports = router;