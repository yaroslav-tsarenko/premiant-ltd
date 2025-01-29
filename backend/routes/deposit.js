const express = require('express');
const { createDeposit, updateDepositStatus } = require('../controllers/depositController');
const router = express.Router();

router.post('/create-deposit', createDeposit);
router.put('/update-status/:email', updateDepositStatus);

module.exports = router;