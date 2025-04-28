const mongoose = require("mongoose");

const CvSchema = new mongoose.Schema({
  name: String,
  title: String,
  phone: String,
  summary: String,
  skills: [
    {
      title: String,
      items: [String],
    },
  ],
  projects: [String],
  experience: {
    role: String,
    company: String,
    description: String,
  },
  softSkills: String,
  education: [
    {
      degree: String,
      institute: String,
      duration: String,
    },
  ],
  contacts: {
    portfolio: String,
    linkedin: String,
    github: String,
    email: String,
  },
});

module.exports = mongoose.model("Cv", CvSchema);
