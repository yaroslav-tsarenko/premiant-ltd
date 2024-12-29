const mongoose = require('mongoose');

const withdrawSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    email: {type: String, required: true},
    amount: {type: Number, required: true},
    date: {type: Date, default: Date.now},
    status: { type: String, required: true, enum: ['pending', 'applied', 'denied'] },
    walletType: {type: String, required: true},
    walletAddress: {type: String, required: true},
});

const Withdraw = mongoose.model('Withdraw', withdrawSchema);

module.exports = Withdraw;