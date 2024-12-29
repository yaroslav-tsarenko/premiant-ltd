const jwt = require('jsonwebtoken');
const User = require('../models/User');
const SECRET_KEY = "4c025b65c5cc41dafdd9b7eafb297d97df58c367eb9d924757072761e6c5e8e41531550eb0d95a0e1161a22b5929d9a38a8af9c65ce23be91d10c3b9fd482d05";

const basicAuth = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'No auth token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log('Decoded token:', decoded);

        const user = await User.findById(decoded.userId);
        if (!user) {
            console.log('User not found for ID:', decoded.userId); // Log user ID for debugging
            return
                res.status(401).send({ message: 'User not found' });

        }

        req.user = user;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.redirect('/');
        } else {
            return res.redirect('/login');
        }
    }
};

module.exports = basicAuth;