const express = require('express');
const multer = require('multer');
const axios = require('axios');
const Resume = require('./models/resume');

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    // Sending the uploaded file to Apache Tika for parsing
    const tikaResponse = await axios.put("http://tika:9998/tika", req.file.buffer, {
      headers: { "Content-Type": req.file.mimetype },
      responseType: "text",
    });
    
    const parsedText = tikaResponse.data;

    // Example: Storing the parsed text along with other details in MongoDB
    const newResume = new Resume({
      name: req.body.name, // Assuming you're also sending the name in the request
      email: req.body.email, // And the email
      resumeFile: req.file.buffer, // Storing the original file
      parsedText: parsedText, // Storing the parsed text
    });

    await newResume.save();

    res.send({ message: 'Resume uploaded and parsed successfully', parsedText: parsedText });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).send({ error: 'Failed to process the uploaded file' });
  }
});

module.exports = router;
