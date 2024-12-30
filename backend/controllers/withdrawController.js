const Withdraw = require('../models/Withdraw');

const createWithdraw = async (req, res) => {
    const { userId, email, amount, walletType, walletAddress, status, withdrawId } = req.body;
    try {
        const newWithdraw = new Withdraw({
            userId,
            email,
            amount,
            walletType,
            walletAddress,
            status,
            withdrawId
        });
        await newWithdraw.save();
        res.status(200).json({ message: 'Withdraw created successfully' });
    } catch (error) {
        console.error('Error creating withdraw:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createWithdraw
};