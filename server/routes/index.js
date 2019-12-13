const express = require('express');
const account = require('./account');
const plan = require('./plan');
const explog = require('./explog');

const router = express.Router();
router.use('/account', account);
router.use('/plan', plan);
router.use('/explog', explog);

module.exports = router;