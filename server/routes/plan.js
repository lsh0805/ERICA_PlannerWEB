const express = require('express');
const router = express.Router();
const plan = require('../module/plan.js');

router.post('/post', (req, res) => {
  plan.post(req.body).then((response) => {
    res.json({...response});
  }).catch(err => {
    console.log(err);
    res.status(401).json(err);
  });
});
router.post('/update', (req, res) => {
  plan.update(req.body).then((response) => {
    res.json({...response});
  }).catch(err => {
    console.log(err);
    res.status(401).json(err);
  });
});
router.post('/delete', (req, res) => {
  plan.delete(req.body).then(() => {
    res.json({success : true});
  }).catch(err => {
    console.log(err);
    res.status(401).json(err);
  });
});
router.post('/getPlans', (req, res) => {
  plan.getPlans({...req.body}).then((arr) => {
    res.json({...arr});
  }).catch(err => {
    console.log(err);
    res.status(401).json(err);
  });
});


module.exports = router;