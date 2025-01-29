const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    secondName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telegram: { type: String, required: true },
    password: { type: String, required: true },
    referralCode: { type: String },
    curator: { type: String },
    balance: { type: Number, default: 0 },
    referrals: { type: Array, default: [] },
    tariff: { type: String, required: true, enum: ['none', 'start', 'comfort', 'maximum', 'exclusive', 'premium'], default: 'none' },
    tariffExpirationDate: { type: Date, required: true, default: Date.now },
    earnings: { type: Number, default: 0 },
    withdrawals: { type: Number, default: 0 },
    totalWithdrawals: { type: Number, default: 0 },
    totalDeposits: { type: Number, default: 0 },
    percent: { type: Number, enum: [1, 2, 4, 8], default: 1 },
    averagePaymentStatus: { type: String, enum: ['pending', 'applied', 'denied'], default: 'pending' },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    usdtWallet: { type: String },
    btcWallet: { type: String },
    perfectMoneyWallet: { type: String },
    ethereumWallet: { type: String },
    payeerWallet: { type: String },
    card: { type: String },
    role: { type: String, required: true, enum: ['user', 'admin'], default: 'user' },
    ipAddress: { type: String },
    fullLocationName: { type: String },
    verificationCode: { type: String },
    verificationCodeExpires: { type: Date },
    verificated: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;