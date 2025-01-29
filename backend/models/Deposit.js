const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    email: {type: String, required: true},
    amount: {type: Number, required: true},
    name: {type: String},
    secondName: {type: String},
    date: {type: Date, default: Date.now},
    status: { type: String, enum: ['pending', 'applied', 'denied'] },
    walletType: {type: String},
    walletAddress: {type: String, required: true},
});

const Deposit = mongoose.model('Deposit', depositSchema);

module.exports = Deposit;