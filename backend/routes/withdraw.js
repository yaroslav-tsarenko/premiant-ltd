const express = require('express');
const router = express.Router();
const { createWithdraw, updateWithdrawStatus } = require('../controllers/withdrawController');

router.post('/create-withdraw', createWithdraw);
router.put('/update-status/:email', updateWithdrawStatus);

module.exports = router;