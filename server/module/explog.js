const { ExpLog } = require('../models');
const moment = require('moment');
const exp = require('./exp.js');
require('moment-timezone');

moment.tz.setDefault("Asia/Seoul");

var response = function(res, err, row = undefined){
  this.res = res;
  this.err = err;
  this.row = row;
}

module.exports = {
  getExpLog: async function (data){
    return new Promise((resolve, reject) => {
      ExpLog.findAll({
        where: {
          email: data.email,
        }
      }).then(rows => {
        return resolve(new response(true, null, rows));
      }).catch(err => {
        return reject(new response(false, err));
      });
    });
  },
  updateExpLog: async function (data){
    let totalExp = exp.getTotalEXP(data.newLevel, data.newEXP);
    let nowDate = moment().format('YYYY[-]MM[-]DD');
    return new Promise((resolve, reject) => {
      ExpLog.findOrCreate({
        where: { email: data.email, date: nowDate,},
        defaults: {
          email: data.email,
          date: nowDate,
          totalExp: totalExp,
        }
      })
      .spread((row, created) => {
        if (created) {
          return resolve(new response(true, null, row));
        } else {
          row.update({
            email: data.email,
            date: nowDate,
            totalExp: totalExp,
          }).then((row) => {
            return resolve(new response(true, null, row));
          }).catch(err => {
            return reject(new response(false, err));
          });
        }
      });
    });
  }
}