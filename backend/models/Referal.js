const mongoose = require('mongoose');
const { transliterate } = require('transliteration');

const referalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: true },
    referralCode: { type: String },
    clicks: { type: Number, default: 0 },
    active: { type: Number, default: 0 },
    unActive: { type: Number, default: 0 },
});

referalSchema.methods.generateReferralCode = function (name, secondName) {
    const transliteratedName = transliterate(name);
    const transliteratedSecondName = transliterate(secondName);
    return `${transliteratedName}.${transliteratedSecondName}`.toLowerCase();
};

const Referal = mongoose.model('Referal', referalSchema);

module.exports = Referal;