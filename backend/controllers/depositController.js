const Deposit = require('../models/Deposit');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const { sendDepositNotification } = require('../telegram-bot/telegramBot');
const StaticTRC = require('../models/StaticTRC');

const createDeposit = async (req, res) => {
    const { userId, email, amount, walletType, status, name, secondName, depositId } = req.body;
    const ipAddress = req.ip;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const staticTrc = await StaticTRC.findOne();
        const walletAddress = staticTrc ? staticTrc.address : '';

        const newDeposit = new Deposit({
            userId,
            email,
            name,
            secondName,
            amount,
            walletType,
            walletAddress,
            status,
            depositId
        });

        await newDeposit.save();

        const newTransaction = new Transaction({
            userId,
            email,
            amount,
            name,
            secondName,
            date: new Date(),
            status,
            walletType,
            transactionType: 'deposit',
            walletAddress
        });

        await newTransaction.save();

        sendDepositNotification(user, newDeposit, ipAddress);

        res.status(201).json({ message: 'Deposit and transaction created successfully', deposit: newDeposit, transaction: newTransaction });
    } catch (error) {
        console.error('Error creating deposit and transaction:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

const updateDepositStatus = async (req, res) => {
    const { email } = req.params;
    const { status } = req.body;

    try {
        const deposit = await Deposit.findOne({ email });
        if (!deposit) {
            console.log('Deposit not found');
            return res.status(404).json({ message: 'Deposit not found' });
        }
        deposit.status = status;
        await deposit.save();

        const transaction = await Transaction.findOne({ email, transactionType: 'deposit' });
        if (!transaction) {
            console.log('Transaction not found');
            return res.status(404).json({ message: 'Transaction not found' });
        }
        transaction.status = status;
        await transaction.save();

        const amount = deposit.amount;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.balance += amount;
        await user.save();

        if (status === 'applied') {
            await Deposit.deleteOne({ email });
        }

        res.status(200).json({ message: `Deposit and transaction status updated successfully for ${email}` });
    } catch (error) {
        console.error('Error updating deposit and transaction status:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createDeposit,
    updateDepositStatus
};