const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  resumeFile: Buffer,
  parsedText: String, // For storing the text extracted by Apache Tika
  // Add other relevant fields as necessary
});

module.exports = mongoose.model("Resume", resumeSchema);
