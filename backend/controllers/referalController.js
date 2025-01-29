const Referal = require('../models/Referal');

const countReferralClick = async (req, res) => {
    const { referralCode } = req.params;
    try {
        const referral = await Referal.findOne({ referralCode: referralCode });
        if (!referral) {
            return res.status(404).json({ message: 'Referral not found' });
        }
        referral.clicks += 1;
        referral.unActive += 1;
        await referral.save();
        console.log('Referral click counted');
        res.status(200).json({ message: 'Referral click counted' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateActiveReferrals = async () => {
    try {
        const referrals = await Referal.find();
        for (const referral of referrals) {
            const users = await User.find({ curator: referral.referralCode });
            referral.active = users.length;
            await referral.save();
        }
        console.log('Referral active counts updated');
    } catch (error) {
        console.error('Error updating referral active counts:', error);
    }
};

const getCurrentReferral = async (req, res) => {
    try {
        const referral = await Referal.findOne({ userId: req.user.id });
        if (!referral) {
            return res.status(404).json({ message: 'Referral not found' });
        }
        res.json(referral);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getReferalByCode = async (req, res) => {
    const { referralCode } = req.params;
    try {
        const referral = await Referal.findOne({ referralCode: referralCode });
        if (!referral) {
            return res.status(404).json({ message: 'Referral not found' });
        }
        res.status(200).json(referral);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getCurrentReferral,
    getReferalByCode,
    countReferralClick,
    updateActiveReferrals
};