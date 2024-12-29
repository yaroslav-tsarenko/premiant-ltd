const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
require('dotenv').config();

const app = express();
const port = 8080;
const origin = 'premiant-ltd.vercel.app';
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

mongoose.connect('mongodb+srv://yaroslavdev:1234567890@premiant.vpogw.mongodb.net/?retryWrites=true&w=majority&appName=premiant', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected✅ '))
    .catch(err => console.log(err));

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}✅ `);
    console.log(`Server's Frontend origin: ${origin}✅ `);
});