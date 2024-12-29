const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
    body('referralCode').optional().trim().escape(),
];

const validationSchemaLogin = [
    body('email').isEmail().normalizeEmail().withMessage('Неверный E-mail'),
    body('password').isLength({ min: 6 }).withMessage('Пароль должен быть минимум 8 символов'),
];

const JWT_SECRET = process.env.JWT_SECRET || "4c025b65c5cc41dafdd9b7eafb297d97df58c367eb9d924757072761e6c5e8e41531550eb0d95a0e1161a22b5929d9a38a8af9c65ce23be91d10c3b9fd482d05";

router.post('/register', validationSchemaRegistration, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, secondName, email, telegram, password, referralCode } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            secondName,
            email,
            telegram,
            password: hashedPassword,
            referralCode,
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error:', error);
        if (error.code === 11000) {
            return res.status(400).json({ error: 'User already exists' });
        }
        res.status(500).send('Server error');
    }
});

router.post('/login', validationSchemaLogin, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.status(200).json({ message: 'Login successful'});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;