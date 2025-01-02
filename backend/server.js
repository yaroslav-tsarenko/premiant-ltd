const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const referalRoutes = require('./routes/referal');
const depositRoutes = require('./routes/deposit');
const withdrawRoutes = require('./routes/withdraw');
const cron = require('node-cron');
const totalBalanceRoutes = require('./routes/totalBalance');
const { updateUserBalances } = require('./controllers/userController');
const { updateTotalBalance } = require('./controllers/totalBalanceController');
const generateReferralCodes = require('./utils/generateReferralCodes');

const app = express();
const port = 8080;
const origin = 'http://localhost:3000' || 'https://premiant-ltd.vercel.app';
app.use(bodyParser.json());
app.use(cors({
    origin: origin,
    credentials: true,
}));

app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

app.use(limiter);

mongoose.connect(`mongodb+srv://yaroslavdev:1234567890@premiant.vpogw.mongodb.net/?retryWrites=true&w=majority&appName=premiant`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected✅ ');
}).catch(err => console.log(err));


cron.schedule('*/1 * * * *', () => {
    console.log('Running updateUserBalances...');
    updateUserBalances();
});
cron.schedule('*/5 * * * *', () => {
    console.log('Running generateReferralCodes...⚙️');
    generateReferralCodes();
});
cron.schedule('*/1 * * * *', () => {
    console.log('Running updateTotalBalance...');
    updateTotalBalance();
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/deposit', depositRoutes);
app.use('/referral', referalRoutes);
app.use('/withdraw', withdrawRoutes);
app.use('/total-balance', totalBalanceRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}✅ `);
    console.log(`Server's Frontend origin: ${origin}✅ `);
});