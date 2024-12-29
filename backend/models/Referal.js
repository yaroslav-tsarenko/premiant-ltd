const mongoose = require('mongoose');

const referalSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    email: {type: String, required: true},
    referralCode: {type: String},
    clicks: {type: Number, default: 0},
    active: {type: Number, default: 0},
    unActive: {type: Number, default: 0},

});

const Referal = mongoose.model('Referal', referalSchema);

module.exports = Referal;