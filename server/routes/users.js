const express = require("express");
const validateID = require("../middleware/validateID");
const User = require("../models/user");

const router = express.Router();

router.get("/", async (req, res) => {
    const users = await User.find().sort("userName");
    res.send(users);
});

router.get("/:id", validateID, async (req, res) => {
    const users = await User.findById(req.params.id);
    if (!user) return res.status(404).send();
    res.send(user);
});

router.post("/", async (req, res) => {
    if (!req.body.title) return res.status(400).send("Title is required.");
    const user = new User ({userName: req.body.userName})
    await user.save();
    res.status(201).send(user);
});

router.delete("/:id", async (req, res) => {
    const user = await User.findByIDandDelete(req.params.id);

    if (!user)
        return res.status(404).send("User ID not found.")

    res.status(204).send();
});

module.exports = router;