const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  avatar: {
    type: String,
    required: true,
  },
  quote: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);
