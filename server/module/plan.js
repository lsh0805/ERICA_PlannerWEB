const { Plan } = require('../models');
const { Account } = require('../models');
const { ExpLog } = require('../models');
const { exp } = require('./exp.js');
const moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/* PlanTypes */
const DAILY_PLAN = 0;
const MONTHLY_PLAN = 1;
const YEARLY_PLAN = 2;
const LOOP_PLAN = 3;

require('moment-timezone');

moment.tz.setDefault("Asia/Seoul");

var response = function(res, err, row = undefined){
  this.res = res;
  this.err = err;
  this.row = row;
}

module.exports = {  
  check: async function(id){
    return new Promise((resolve, reject) => {
      // Find id in DB
      Plan.findOne({
          where: {id: id}
      }).then(function(row){
        if(!row)
          return reject(new response(false, "해당 ID값을 가진 행이 존재하지 않습니다."));
        return resolve(new response(true, null, row));
      }).catch(function(error) {
        return reject(new response(false, error));
      });
    });
  },
  post: async function(data){
    return new Promise((resolve, reject) => {
      Plan.create(
        {
          author: data.author,
          title: data.title,
          exp: data.exp,
          date: moment(data.date).add(9, 'h').toDate(),
          type: data.type,
        }
      ).then((row) => {
        return resolve(new response(true, null, row));
      }).catch(err => {
        return reject(new response(false, err));
      });
    });
  },
  getUserData: async function(email){
    return new Promise((resolve, reject) => {
      // Find id in DB
      Account.findOne({
          where: {email: email}
      }).then(function(row){
        if(!row)
          return reject(new response(false, "해당 이메일에 해당하는 유저가 존재하지 않습니다."));
        return resolve(new response(true, null, row));
      }).catch(function(error) {
        return reject(new response(false, error));
      });
    });
  },
  update: async function(data){
    let check_res = await this.check(data.id);
    return new Promise((resolve, reject) => {
      if(check_res.res === true){
        Plan.update(
          {
            ...data
          },
          { where : { id: data.id } }
        ).then(async () => {
          let check_res = await this.check(data.id);
          return resolve(new response(true, null, check_res.row));
        }).catch((err) => {
          return reject(new response(false, err));
        });
      }else{
        return reject(new response(false, "해당하는 행을 찾을 수 없습니다."));
      }
    });
  },
  delete: async function(data){
    let check_res = new response(false, null);
    if(data.id != undefined)
      check_res = await this.check(data.id);
    return new Promise((resolve, reject) => {
        if(check_res.res === true){
          Plan.destroy(
            { where : { id: data.id } }
          ).then(() => {
            return resolve(new response(true, null));
          }).catch((err) => {
            return reject(new response(false, err));
          });
        }else{
          return reject(new response(false, check_res.err));
        }
    });
  },
  getPlans: async function(data){
    return new Promise((resolve, reject) => {
      // Find id in DB
      Plan.findAll({
          where: {
            author: data.author,
            type: data.type,
            date: {
              [Op.between]: [moment(data.dateStart).add(9, 'h').toDate(), moment(data.dateEnd).add(9, 'h').toDate()]
            }
          }
      }).then(function(rows){
        return resolve(new response(true, null, rows));
      }).catch(function(error) {
        return reject(new response(false, error));
      });
  });
  }
};