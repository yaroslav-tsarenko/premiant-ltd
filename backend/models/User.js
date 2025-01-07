const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    secondName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telegram: { type: String, required: true },
    password: { type: String, required: true },
    referralCode: { type: String },
    curator: { type: String },
    balance: { type: Number, default: '0' },
    referrals: { type: Array, default: [] },
    tariff: { type: String, required: true, enum: ['start', 'comfort', 'maximum', 'exclusive', 'premium'], default: 'start' },
    earnings: { type: Number, default: '0' },
    withdrawals: { type: Number, default: '0' },
    usdtWallet: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    btcWallet: { type: String },
    perfectMoneyWallet: { type: String },
    ethereumWallet: { type: String },
    payeerWallet: { type: String },
    card: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;