const express = require('express');
const { createDeposit } = require('../controllers/depositController');
const router = express.Router();

router.post('/create-deposit', createDeposit);

module.exports = router;