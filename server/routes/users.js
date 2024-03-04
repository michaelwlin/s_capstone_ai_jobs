const express = require("express");
const validateID = require("../middleware/validateID");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
    const users = await User.find().sort("userName");
    res.send(users);
});

router.get('/check-resume', async (req, res) => {
    const { email } = req.query;
  
    if (!email) {
      return res.status(400).json({ error: 'Email parameter is required.' });
    }
  
    try {
      const user = await User.findOne({ email: email });
      const hasResume = !!user && !!user.resume;
      res.json({ exists: hasResume });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while checking for the resume.' });
    }
  });

router.post('/upload-resume', upload.single('resume'), async (req, res) => {
    const email = req.body.email;
    const resumeFile = req.file;

    if (!email || !resumeFile) {
        return res.status(400).send("Email and resume are required.");
    }

    try {
        const resumeText = resumeFile.buffer.toString('utf-8');
        const updatedUser = await User.findOneAndUpdate({ email: email }, { resume: resumeText }, { new: true });

        if (!updatedUser) {
            return res.status(404).send("User not found.");
        }

        res.send({ message: "Resume uploaded successfully." });
    } catch (error) {
        console.error("Error uploading resume:", error);
        res.status(500).send("Error uploading resume.");
    }
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
            resume,
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