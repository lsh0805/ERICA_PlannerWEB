const { VerifyToken } = require('../models');
const register = require('../module/register.js');
const bcrypt = require('bcryptjs');

module.exports = {
  generateToken: function() {
    let token = "";
    let hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    for(let i = 0; i < 30; i++)
      token += String(hex[Math.round(Math.random() * 15)]);
    return token; 
  },
  create: async function(data){
    let token = this.generateToken();
    return new Promise(function(resolve, reject) {
      bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(data.password, salt, function(err, hash){
          if(err)
            return reject(err);
          VerifyToken.create({
            nickname: data.nickname,
            password: hash,
            email: data.email,
            alarm: data.alarm,
            token: token,
          }).then(account => {
            return resolve(account);
          }).catch(err => {
            return reject(err);
          });
        });
      });
    });
  },
  registerAccount: function(data) {
    let token = data.token;
    return new Promise((resolve, reject) => {
      VerifyToken.findOne({where: {token}})
      .then((row) => {
        // 발견했을 경우
        if(row){
          register.execute(row.dataValues).then(row => {
            VerifyToken.destroy({where: {token}})
            .then(() => {
              return resolve(row);
            }).catch(err => {
              return reject(err);
            });
          }).catch(err => {
            return reject(err);
          })
        }else{
          return reject("Invalid Verification");
        }
      }).catch(err => {
        return reject(err);
      })
    });
  }
}