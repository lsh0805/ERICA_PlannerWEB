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
          ...data,
          date: moment(data.date).add(9, 'h').toDate(),
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
    let wherePlanObj;
    if(data.type === DAILY_PLAN || data.type === MONTHLY_PLAN
      || data.type === YEARLY_PLAN){
      wherePlanObj = {
        author: data.author,
        type: data.type,
        date: {
          [Op.between]: [moment(data.dateStart).add(9, 'h').toDate(), moment(data.dateEnd).add(9, 'h').toDate()]
        }
      };
    }else if(data.type === LOOP_PLAN){
      /* data로 date값이 같이 들어오기 때문에 객체 분해 할당으로(...data) 객체 만들면
        date값이 where에 적용되므로 요일반복 일정은 일일이 객체값을 할당해줘야함.
        client에서 where에 필요한 data값만 request를 하도록 고쳐야 할지 고려하기. */
      wherePlanObj = {
        author: data.author,
        type: data.type,
        [Op.or]: [
          {cycleMonday: data.cycleMonday},
          {cycleTuesday: data.cycleTuesday},
          {cycleWednesday: data.cycleWednesday},
          {cycleThursday: data.cycleThursday},
          {cycleFriday: data.cycleFriday},
          {cycleSaturday: data.cycleSaturday},
          {cycleSunday: data.cycleSunday},
        ],
      };
    }
    return new Promise((resolve, reject) => {
      // Find id in DB
      Plan.findAll({
          where: wherePlanObj
      }).then(function(rows){
        return resolve(new response(true, null, rows));
      }).catch(function(error) {
        return reject(new response(false, error));
      });
  });
  }
};