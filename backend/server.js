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

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' || 'premiant-ltd.vercel.app', credentials: true }));
app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

app.use(limiter);

mongoose.connect('mongodb+srv://yaroslavdev:1234567890@haul-depot-db.7lk8rg9.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected✅ '))
    .catch(err => console.log(err));

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}✅ `);
});