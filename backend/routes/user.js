const express = require('express');
const router = express.Router();
const { getUser, updateUser, requestPasswordReset, verifyCode, resetPassword } = require('../controllers/userController');
const basicAuth = require('../middleware/basicAuth.mjddleware');

router.get('/get-user', basicAuth, getUser);
router.put('/update-user', updateUser);
router.post('/request-password-reset', requestPasswordReset);
router.post('/verify-code', verifyCode);
router.post('/reset-password', resetPassword);

module.exports = router;