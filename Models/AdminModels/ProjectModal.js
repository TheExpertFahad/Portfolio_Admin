const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ['live', 'closed', 'development'],
    default: 'live',
  },
  title: String,
  description: String,
  link: String,
  image: String,
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
