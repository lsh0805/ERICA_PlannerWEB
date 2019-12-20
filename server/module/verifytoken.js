const { VerifyToken } = require('../models');
const register = require('../module/register.js');
const verifyTokenTypes = require('../module/verifyTokenTypes.js');
const bcrypt = require('bcryptjs');
const login = require('../module/login.js');

module.exports = {
  generateToken: async function() {
    let token = "";
    let hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    for(let i = 0; i < 30; i++)
      token += String(hex[Math.round(Math.random() * 15)]);
    return VerifyToken.findOne({where: {token}})
    .then((row) => {
      if(row)
        return this.generateToken();
      else
        return token;
    }).catch(err => {
      console.log(err);
      return err;
    });
  },
  createResetPasswordToken: async function(data){
    let token = await this.generateToken();
    return new Promise(function(resolve, reject) {
      bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(data.password, salt, function(err, hash){
          if(err)
            return reject(err);
          VerifyToken.create({
            password: hash,
            email: data.email,
            token: token,
            type: verifyTokenTypes.TOKEN_TYPE_RESET_PASSWORD
          }).then(row => {
            return resolve(row);
          }).catch(err => {
            return reject(err);
          });
        });
      });
    });
  },
  createMakeAccountToken: async function(data){
    let token = await this.generateToken();
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
            type: verifyTokenTypes.TOKEN_TYPE_MAKE_ACCOUNT
          }).then(account => {
            return resolve(account);
          }).catch(err => {
            return reject(err);
          });
        });
      });
    });
  },
  findTokenRow: function(token) {
    return new Promise((resolve, reject) => {
      VerifyToken.findOne({where: {token}})
      .then((row) => {
        if(row)
          resolve(row);
        else
          reject("Invalid Verification");
      }).catch(err => {
        reject(err);
      })
    });
  },
  resetPassword: function(row) {
    let token = row.token;
    return new Promise((resolve, reject) => {
      login.resetPassword(row.dataValues).then(() => {
        VerifyToken.destroy({where: {token}})
        .then(() => {
          return resolve();
        }).catch(err => {
          return reject(err);
        });
      }).catch(err => {
        return reject(err);
      });
    });
  },
  registerAccount: function(row) {
    let token = row.token;
    return new Promise((resolve, reject) => {
      register.execute(row.dataValues).then(row => {
        VerifyToken.destroy({where: {token}})
        .then(() => {
          return resolve(row);
        }).catch(err => {
          return reject(err);
        });
      }).catch(err => {
        return reject(err);
      });
    });
  }
}