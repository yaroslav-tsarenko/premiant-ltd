// backend/server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
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
const formRoutes = require('./routes/form');
const withdrawRoutes = require('./routes/withdraw');
const cron = require('node-cron');
const totalBalanceRoutes = require('./routes/totalBalance');
const { updateUserBalances } = require('./controllers/userController');
const { updateTotalBalance } = require('./controllers/totalBalanceController');
const TotalBalance = require('./models/TotalBalance');
const generateReferralCodes = require('./utils/generateReferralCodes');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
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
    console.log('Running updateUserBalances...⚙️');
    updateUserBalances();
});
cron.schedule('*/5 * * * *', () => {
    console.log('Running generateReferralCodes...⚙️');
    generateReferralCodes();
});
setInterval(() => {
    console.log('Running updateTotalBalance...⚙️');
    updateTotalBalance();
}, 1000); // Update every second

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/deposit', depositRoutes);
app.use('/referral', referalRoutes);
app.use('/withdraw', withdrawRoutes);
app.use('/total-balance', totalBalanceRoutes);
app.use('/form', formRoutes);

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('close', () => console.log('Client disconnected'));
});

const broadcastTotalBalance = async () => {
    try {
        const totalBalance = await TotalBalance.findOne();
        if (totalBalance) {
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ totalBalance: totalBalance.totalBalance }));
                }
            });
        }
    } catch (error) {
        console.error('Error broadcasting total balance:', error);
    }
};

setInterval(broadcastTotalBalance, 1000); // Broadcast every second

server.listen(port, () => {
    console.log(`Server running on port ${port}✅ `);
    console.log(`Server's Frontend origin: ${origin}✅ `);
});