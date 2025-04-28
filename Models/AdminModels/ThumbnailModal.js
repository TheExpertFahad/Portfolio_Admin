const mongoose = require('mongoose');

const ThumbnailSchema = new mongoose.Schema({
  showThumbnail: {
    type: Boolean,
    default: false,
  },
  viewType: {
    type: String,
    enum: ['live', 'pdf', 'image'],
    default: 'live',
  },
  
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
 
}, {
  timestamps: true
});

module.exports = mongoose.model('Thumbnail', ThumbnailSchema);
