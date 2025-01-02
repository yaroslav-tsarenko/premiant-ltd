const express = require('express');
const router = express.Router();
const { getTotalBalance } = require('../controllers/totalBalanceController');

router.get('/get-total-balance', getTotalBalance);

module.exports = router;