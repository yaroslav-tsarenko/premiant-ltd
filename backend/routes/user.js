const express = require('express');
const router = express.Router();
const User = require('../models/User');
const basicAuth = require('../middleware/basicAuth.mjddleware');

router.get('/get-user', basicAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user){
            res.redirect('/');
            res.status(404).json({ error: 'User not found' });
        }
        res.json({ user });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;