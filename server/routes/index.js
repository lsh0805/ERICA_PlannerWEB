const express = require('express');
const account = require('./account');
const plan = require('./plan');

const router = express.Router();
router.use('/account', account);
router.use('/plan', plan);

module.exports = router;