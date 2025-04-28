const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema({
  degree: String,
  institute: String,
  startDate: String,
  endDate: String,
  degree_level: String,
});

module.exports = mongoose.model("Education", EducationSchema);
