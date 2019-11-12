const express = require('express');
const router = express.Router();
const register = require('../module/register.js');
const login = require('../module/login.js');
const session = require('express-session');
const fs = require('fs');
const qs = require('querystring');
const bodyParser = require('body-parser');

const sessionData = fs.readFileSync('./config/session.json');
const sessionSecret = JSON.parse(sessionData);

router.use(session({
    secret: sessionSecret.secret,
    resave: false,
    saveUninitialized: true
}));

router.use(bodyParser.json());

router.get('/', (req, res) => {
    res.json({success:true});
});
router.post('/login', (req, res) => {
    console.log(req.body);
    login.execute(req.body).then((account) => {
        // Success on login
        // Alter session
        let session = req.session;
        session.loginInfo = {
            _id: account.id,
            username: account.email
        };
        res.json({ 'success' : true});
    }).catch((err) => {
        // Fail on login
        console.log(err);
        res.status(401).json({ 'err': err });
    });
});
router.get('/logout', (req, res) => {
    console.log("Dsdas");
    req.session.destroy(err => { 
        if(err)
            return res.status(401).json({ 'err': err});
        else
            return res.json({ success: true }); });
});
router.get('/getInfo', (req, res) => {
    console.log(req.session);
    if(typeof req.session.loginInfo === "undefined") {
        return res.status(401).json({ err: 1 });
    }
    res.json({ info: req.session.loginInfo });
});

router.post('/register', (req, res) =>{
    register.execute(req.body).then((response) => {
        // Success on Register
        res.json({'success': true});
    }).catch((err) => {
        // Fail on Register
        console.log(err);
        res.status(401).json({ err: err });
    });
});

module.exports = router;