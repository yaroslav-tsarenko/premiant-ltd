const express = require('express');
const { getCurrentReferral, getReferalByCode, countReferralClick } = require('../controllers/referalController');
const basicAuth = require("../middleware/basicAuth.mjddleware");
const router = express.Router();

router.put('/referral-click/:referralCode', countReferralClick);
router.get('/current-referral', basicAuth, getCurrentReferral);
router.get('/get-referral/:referralCode', getReferalByCode);

module.exports = router;