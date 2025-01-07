const TotalBalance = require('../models/TotalBalance');

const updateTotalBalance = async () => {
    try {
        let totalBalance = await TotalBalance.findOne();
        if (!totalBalance) {
            totalBalance = new TotalBalance();
        }
        totalBalance.totalBalance = parseFloat((totalBalance.totalBalance * 1.01).toFixed(0));
        await totalBalance.save();
        console.log('Total balance updated:', totalBalance.totalBalance);
    } catch (error) {
        console.error('Error updating total balance:', error);
    }
};

const getTotalBalance = async (req, res) => {
    try {
        const totalBalance = await TotalBalance.findOne();
        if (!totalBalance) {
            return res.status(404).json({ message: 'Total balance not found' });
        }
        res.json({ totalBalance: totalBalance.totalBalance });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { updateTotalBalance, getTotalBalance };