const express = require('express');
const router = express.Router();
const { getUser, updateUser, requestPasswordReset, verifyCode, resetPassword, getAllUsersByCurator, getAllUsers, getAllUserWithdrawals, getAllUserDeposits} = require('../controllers/userController');
const basicAuth = require('../middleware/basicAuth.mjddleware');

router.get('/get-user', basicAuth, getUser);
router.put('/update-user/:id', updateUser);
router.post('/request-password-reset', requestPasswordReset);
router.post('/verify-code', verifyCode);
router.post('/reset-password', resetPassword);
router.get('/get-all-users-by-curator', basicAuth, getAllUsersByCurator);
router.get('/get-all', basicAuth, getAllUsers);
router.get('/get-all-users-deposits', getAllUserDeposits);
router.get('/get-all-users-withdrawals', getAllUserWithdrawals);

module.exports = router;