const mongoose = require('mongoose');

const resetTokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
});

const ResetTokenModal = mongoose.model('ResetToken', resetTokenSchema);

module.exports = ResetTokenModal;
