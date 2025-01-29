const Withdraw = require('../models/Withdraw');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const { sendWithdrawNotification } = require('../telegram-bot/telegramBot');

const createWithdraw = async (req, res) => {
    const { userId, email, amount, walletType, walletAddress, status, name, secondName, withdrawId } = req.body;
    const ipAddress = req.ip;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newWithdraw = new Withdraw({
            userId,
            email,
            name,
            secondName,
            amount,
            walletType,
            walletAddress,
            status,
            withdrawId
        });
        await newWithdraw.save();

        const newTransaction = new Transaction({
            userId,
            email,
            amount,
            walletType,
            walletAddress,
            status: 'pending',
            transactionType: 'withdraw'
        });
        await newTransaction.save();

        if (status === 'applied') {
            user.withdrawals += amount;
            await user.save();
        }

        sendWithdrawNotification(user, newWithdraw, ipAddress);

        res.status(200).json({ message: 'Withdraw and Transaction created successfully' });
    } catch (error) {
        console.error('Error creating withdraw and transaction:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateWithdrawStatus = async (req, res) => {
    const { email } = req.params;
    const { status } = req.body;

    try {
        const withdraw = await Withdraw.findOne({ email });
        if (!withdraw) {
            return res.status(404).json({ message: 'Withdraw not found' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const transaction = await Transaction.findOne({ email, transactionType: 'withdraw' });
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        withdraw.status = status;
        await withdraw.save();
        user.balance -= withdraw.amount;
        user.withdrawals += withdraw.amount;
        await user.save();
        transaction.status = 'applied';
        await transaction.save();
        if (status === 'applied') {
            await Withdraw.deleteOne({ email });
        }
        res.status(200).json({ message: `Withdraw status updated successfully for ${email}` });
    } catch (error) {
        console.error('Error updating withdraw status:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createWithdraw,
    updateWithdrawStatus
};