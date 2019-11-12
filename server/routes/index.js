const express = require('express');
const account = require('./account');

const router = express.Router();
router.use('/account', account);

module.exports = router;