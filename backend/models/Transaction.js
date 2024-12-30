const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    email: {type: String, required: true},
    amount: {type: Number, required: true},
    date: {type: Date, default: Date.now},
    status: { type: String, required: true, enum: ['pending', 'applied', 'denied'] },
    walletType: {type: String, required: true},
    transactionType: {type: String, required: true, enum: ['withdraw', 'deposit']},
    walletAddress: {type: String, required: true},
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;