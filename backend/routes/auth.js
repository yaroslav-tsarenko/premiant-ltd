const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const crypto = require('crypto');
const { sendNewUserNotification } = require('../telegram-bot/telegramBot');
const sendEmail = require("../utils/sendEmail");
const router = express.Router();

const validationSchemaRegistration = [
    body('name').trim().escape().notEmpty().withMessage('Введите имя'),
    body('secondName').trim().escape().notEmpty().withMessage('Введите фамилию'),
    body('email').isEmail().normalizeEmail().withMessage('Неверный E-mail'),
    body('telegram').trim().escape().notEmpty().withMessage('Введите Telegram'),
    body('password').isLength({ min: 6 }).withMessage('Пароль должен быть минимум 8 символов'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Пароли должны совпадать');
        }
        return true;
    }),
];

const validationSchemaLogin = [
    body('email').isEmail().normalizeEmail().withMessage('Неверный E-mail'),
    body('password').isLength({ min: 6 }).withMessage('Пароль должен быть минимум 8 символов'),
];

const JWT_SECRET = "4c025b65c5cc41dafdd9b7eafb297d97df58c367eb9d924757072761e6c5e8e41531550eb0d95a0e1161a22b5929d9a38a8af9c65ce23be91d10c3b9fd482d05";

router.post('/register', validationSchemaRegistration, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, secondName, email, telegram, password, curator, ipAddress, fullLocationName } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Пользователь уже существует' });
        }

        const verificationCode = crypto.randomInt(100000, 999999).toString();
        const newUser = new User({
            name,
            secondName,
            email,
            telegram,
            password,
            curator,
            ipAddress,
            fullLocationName,
            verificationCode,
            verificationCodeExpires: Date.now() + 3600000,
        });
        sendEmail(email, 'Код для верификации PremiantLTD', `Для подтверждения личности нужно ввести этот код: ${verificationCode}`);
        await newUser.save();

        setTimeout(() => {
            sendNewUserNotification(newUser);
        }, 60000);

        res.status(201).json({ message: 'Verification code sent to email' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

router.post('/verify-code', async (req, res) => {
    const { email, verificationCode } = req.body;

    try {
        const user = await User.findOne({
            email,
            verificationCode,
            verificationCodeExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired verification code' });
        }

        user.verificationCode = undefined;
        user.verificationCodeExpires = undefined;
        user.verificated = true;
        await user.save();

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ message: 'Verification code is valid', token });
    } catch (error) {
        console.error('Error verifying code:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('User logging in:', req.body);
        const user = await User.findOne({ email });

        if (!user) {
            console.error('User not found:', email);
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        if (password !== user.password) {
            console.error('Password does not match for user:', email);
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
        const decoded = jwt.verify(token, JWT_SECRET);
        const currentUser = await User.findById(decoded.userId);

        if (!currentUser) {
            return res.status(400).json({ error: 'User not found' });
        }

        const redirectUrl = currentUser.role === 'admin' ? '/admin-deposits' : '/account';
        res.status(201).json({ message: 'User logged in successfully', token, redirectUrl });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Server error');
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token', { path: '/' });
    res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;