const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '1h' }
});

module.exports = mongoose.model('Authorization', authSchema);
