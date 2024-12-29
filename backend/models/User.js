const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    secondName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telegram: { type: String, required: true },
    password: { type: String, required: true },
    referralCode: { type: String },
    balance: { type: Number, default: '0' },
    referrals: { type: Array, default: [] },
    tariff: { type: Number, default: '0' },
    earnings: { type: Number, default: '0' },
    withdrawals: { type: Number, default: '0' },
});

const User = mongoose.model('User', userSchema);

module.exports = User;