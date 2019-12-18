const express = require('express');
const router = express.Router();
const register = require('../module/register.js');
const login = require('../module/login.js');
const user = require('../module/user.js');
const verifyToken = require('../module/verifytoken.js');
const verifyTokenTypes = require('../module/verifyTokenTypes.js');
const nodemailer = require('nodemailer');
const fs = require('fs');

const emailData = fs.readFileSync('./config/email.json');
const email = JSON.parse(emailData);
const clientAddressData = fs.readFileSync('./config/clientAddress.json');
const clientAddress = JSON.parse(clientAddressData);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email.email,
    pass: email.password
  }
});

router.post('/login', (req, res) => {
  login.execute(req.body).then((account) => {
    // Success on login
    // Alter session
    req.session.loginInfo = {
      _id: account.id,
      email: account.email,
      username: account.nickname,
      level: account.level,
      exp: account.exp,
    };
    res.json({ 'success' : true});
  }).catch((err) => {
    // Fail on login
    console.log(err);
    res.status(401).json(err);
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy(err =>
  { 
    if(err)
      return res.status(401).json({ 'err': err});
    else
      return res.json({ success: true }); });
  }
);

router.post('/getSessionInfo', (req, res) => {
  if(req.session.loginInfo == undefined)
      return res.status(401).json({ err: 1 });
  return res.json({ info: req.session.loginInfo });
});

// 토큰 값 확인해서 각 토큰 타입에 맞는 처리 진행
router.post('/verify', (req, res) => {
  verifyToken.findTokenRow(req.body.token).then(row => {
    switch(row.type){
      case verifyTokenTypes.TOKEN_TYPE_MAKE_ACCOUNT:
        verifyToken.registerAccount(row).then(account => {
          return res.json({message: "성공적으로 회원가입 되었습니다. 서비스를 이용하기 위해서 로그인 해주세요."});
        }).catch(err => {
          return res.status(401).json({message: "Invalid Verification"});
        });
        break;
      case verifyTokenTypes.TOKEN_TYPE_RESET_PASSWORD:
        verifyToken.resetPassword(row).then(() => {
          return res.json({message: "성공적으로 비밀번호를 초기화하였습니다. 서비스를 이용하기 위해서 로그인 해주세요."});
        }).catch(err => {
          console.log(err);
          return res.status(401).json({message: "Invalid Verification"});
        });
        break;
      default:
        break;
    }
  }).catch(err => {
    console.log(err);
    res.status(401).json({error: err, message: "Invalid Verification"});
  });
});

// 회원가입 정보가 가능한지 확인하고 가능하면 인증메일 보냄
router.post('/checkAvailiableRegisterData', (req, res) =>{
  register.check(req.body).then(() => {
    verifyToken.createMakeAccountToken(req.body).then((row) => {
      let email = req.body.email;
      let mailOptions = {
        from: email.email,    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
        to: email ,                     // 수신 메일 주소
        subject: '[Next level] 회원가입을 위한 인증 메일입니다.',   // 제목
        html: '<p>아래의 링크를 클릭해주세요 !</p>' +
        "<a href=" + clientAddress.address + "/verify/" + row.token +">인증하기</a>"
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error)
          console.log(error);
        else
          console.log('Email sent: ' + info.response);
      });
      res.json({'success': true});
    }).catch(err => {
      console.log(err);
      res.status(401).json({ err: err });
    });
  }).catch(err => {
    // Fail on Register
    console.log(err);
    res.status(401).json({ err: err });
  });
});

router.post('/getUserInfo', (req, res) => {
  user.getUserInfo(req.body).then(response => {
    res.json(response);
  }).catch(error => {
    res.status(401).json({ err: err });
  });
});

router.post('/updateUserInfo', (req, res) => {
  user.updateUserInfo(req.body)
  .then(response => {
    res.json(response);
  }).catch(error => {
    res.status(401).json(error);
  });
});

// 존재하는 이메일인지 확인하고 가능하면 인증메일 보냄
router.post("/forgetPasswordSendMail", (req, res) => {
  let email = req.body.email;
  login.checkEmail(email).then(() => {
    verifyToken.createResetPasswordToken(req.body)
    .then(row => {
      let mailOptions = {
        from: email.email,    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
        to: email ,                     // 수신 메일 주소
        subject: '[Next level] 비밀번호 초기화를 위한 인증 메일입니다.',   // 제목
        html: '<p>아래의 링크를 클릭해주세요 !</p>' +
        "<a href=" + clientAddress.address + "/verify/" + row.token +">인증하기</a>"
      };
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        }
        else {
          console.log('Email sent: ' + info.response);
        }
      });
      return res.json({success: true});
    }).catch(error => {
      return res.status(401).json({error: error});
    });
  }).catch(error => {
    return res.status(401).json({error: error});
  });
});

module.exports = router;