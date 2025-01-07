const User = require('../models/User');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail')
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            res.redirect('/');
            res.status(404).json({ error: 'User not found' });
        }
        res.json({ user });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
};

const updateUser = async (req, res) => {
    const { userId, name, secondName, email, telegram, oldPassword, newPassword, trc20, perfectMoney, payeer, bitcoin, ethereum, visaMastercard } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name;
        user.secondName = secondName;
        user.email = email;
        user.telegram = telegram;
        if (oldPassword && newPassword) {
            user.password = newPassword;
        }
        user.usdtWallet = trc20;
        user.perfectMoneyWallet = perfectMoney;
        user.payeerWallet = payeer;
        user.btcWallet = bitcoin;
        user.ethereumWallet = ethereum;
        user.card = visaMastercard;

        await user.save();

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

const updateUserBalances = async () => {
    try {
        const users = await User.find();
        users.forEach(async (user) => {
            if (user.balance <= 0) {
                console.log(`User ${user.email} has no funds`);
                return;
            }

            let percentage = 0;
            switch (user.tariff) {
                case 'start':
                    percentage = 0.02;
                    break;
                case 'comfort':
                    percentage = 0.0335;
                    break;
                case 'maximum':
                    percentage = 1.54;
                    break;
                case 'exclusive':
                    percentage = 1.72;
                    break;
                case 'premium':
                    percentage = 0.0567;
                    break;
                default:
                    break;
            }
            const earnings = user.balance * percentage;
            user.earnings += earnings;
            user.balance += earnings;

            // Update tariff based on balance
            if (user.balance >= 40000) {
                user.tariff = 'exclusive';
            } else if (user.balance >= 15000) {
                user.tariff = 'maximum';
            } else if (user.balance >= 7000) {
                user.tariff = 'premium';
            } else if (user.balance >= 2000) {
                user.tariff = 'comfort';
            }

            await user.save();
        });
        console.log('User balances and tariffs updated successfully');
    } catch (error) {
        console.error('Error updating user balances and tariffs:', error);
    }
};

const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const verificationCode = crypto.randomInt(100000, 999999).toString();
        user.resetPasswordToken = verificationCode;
        user.resetPasswordExpires = Date.now() + 3600000;

        await user.save();

        await sendEmail(
            user.email,
            'Password Reset Verification Code',
            `Your verification code is ${verificationCode}`
        );

        res.status(200).json({ message: 'Verification code sent to email' });
    } catch (error) {
        console.error('Error requesting password reset:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const verifyCode = async (req, res) => {
    const { email, verificationCode } = req.body;
    try {
        const user = await User.findOne({
            email,
            resetPasswordToken: verificationCode,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired verification code' });
        }

        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Verification code is valid' });
    } catch (error) {
        console.error('Error verifying code:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!newPassword) {
            return res.status(400).json({ message: 'New password is required' });
        }

        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getUser,
    updateUser,
    updateUserBalances,
    requestPasswordReset,
    verifyCode,
    resetPassword,
};