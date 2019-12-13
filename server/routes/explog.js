const express = require('express');
const router = express.Router();
const explog = require('../module/explog.js');

router.post('/getLog', (req, res) => {
  explog.getExpLog(req.body).then((response) => {
    res.json({...response});
  }).catch(err => {
    res.status(401).json(err);
  });
});

module.exports = router;