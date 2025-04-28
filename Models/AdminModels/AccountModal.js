const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth', required: true }, // Link to the user
    name: { type: String, required: true },
    email: { type: String },
    mobileNo: { type: String },
    address: { type: String },
    type: {
        type: String,
        enum: ['credit', 'debit'],
        required: true,
        default: 'credit'
    },
    amount: { type: Number, default: 0 }
}, {
    timestamps: true
});

module.exports = mongoose.model('Accounts', AccountSchema);
