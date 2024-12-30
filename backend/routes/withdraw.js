const express = require('express');
const router = express.Router();
const { createWithdraw } = require('../controllers/withdrawController');

router.post('/create-withdraw', createWithdraw);

module.exports = router;