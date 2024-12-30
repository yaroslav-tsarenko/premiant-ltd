const express = require('express');
const router = express.Router();
const { getUser, updateUser } = require('../controllers/userController');
const basicAuth = require('../middleware/basicAuth.mjddleware');

router.get('/get-user', basicAuth, getUser);
router.put('/update-user', updateUser);

module.exports = router;