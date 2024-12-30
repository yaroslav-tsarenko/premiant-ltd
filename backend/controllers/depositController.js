const Deposit = require('../models/Deposit');

const createDeposit = async (req, res) => {
    const { userId, email, amount, walletType, walletAddress, status, depositId } = req.body;

    try {
        const newDeposit = new Deposit({
            userId,
            email,
            amount,
            walletType,
            walletAddress,
            status,
            depositId
        });

        await newDeposit.save();
        res.status(201).json({ message: 'Deposit created successfully', deposit: newDeposit });
    } catch (error) {
        console.error('Error creating deposit:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    createDeposit
};