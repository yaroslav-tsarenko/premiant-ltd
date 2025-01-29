const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const helmet = require('helmet');
/*const rateLimit = require('express-rate-limit');*/
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const locationRoutes = require('./routes/location');
const referalRoutes = require('./routes/referal');
const staticTrcRoutes = require('./routes/staticTrc');
const depositRoutes = require('./routes/deposit');
const formRoutes = require('./routes/form');
const withdrawRoutes = require('./routes/withdraw');
const transaction = require('./routes/transaction');
const cron = require('node-cron');
const totalBalanceRoutes = require('./routes/totalBalance');
const { updateUserBalances } = require('./controllers/userController');
const { updateTotalBalance } = require('./controllers/totalBalanceController');
const { updateActiveReferrals } = require('./controllers/referalController');
const TotalBalance = require('./models/TotalBalance');
const generateReferralCodes = require('./utils/generateReferralCodes');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const port = 8080;
const allowedOrigins = ['https://premiant-ltd.vercel.app', 'https://www.premiant.ltd', 'https://premiant.ltd'];
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

app.use(helmet());

/*const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
});

app.use(limiter);*/

mongoose.connect(`mongodb+srv://yaroslavdev:1234567890@premiant.vpogw.mongodb.net/?retryWrites=true&w=majority&appName=premiant`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected✅ ');
}).catch(err => console.log(err));

cron.schedule('*/1 * * * *', () => {
    console.log('Running generateReferralCodes...⚙️');
    console.log('Running updateActiveReferrals...⚙️');
    updateActiveReferrals();
    generateReferralCodes();
});

cron.schedule('*/60 * * * *', () => {
    console.log('Running updateUserBalances...⚙️');
    updateUserBalances();
});

setInterval(() => {
    updateTotalBalance();
}, 1000);

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/deposit', depositRoutes);
app.use('/withdraw', withdrawRoutes);
app.use('/referral', referalRoutes);
app.use('/total-balance', totalBalanceRoutes);
app.use('/transaction', transaction);
app.use('/trc', staticTrcRoutes);
app.use('/location', locationRoutes);
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

setInterval(broadcastTotalBalance, 1000);

server.listen(port, () => {
    console.log(`Server running on port ${port}✅ `);
    console.log(`Server's Frontend origins: ${allowedOrigins.join(', ')}✅ `);
});