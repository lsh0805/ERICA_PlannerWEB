/*
    ACCOUNT REGISTER: POST /api/account/register
    BODY SAMPLE: { "email": "test@test.com", "password": "test", "nickname": "test_name", "alarm": false }
*/
const { Account } = require('../models');
var response = function(res, err){
    this.res = res;
    this.err = err;
}

module.exports = {  
    validateEmail: async function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(email))
            return new response(false, "올바른 이메일 형식이 아닙니다.");
        else if(email.length > 320)
            return new response(false, "이메일은 320글자 이하이어야 합니다.");
        let err = null;
        await Account.findOne({
            where: {email: email}
        }).then(function(result) {
            if(result)
                err = "해당 이메일은 이미 가입되어있습니다.";
        });
        if(err)
            return new response(false, err);
        else
            return new response(true, null);
    },

    validateNickname: async function (nickname){
        var re = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
        if(re.test(nickname))
            return new response(false, "닉네임에는 특수문자를 포함시킬 수 없습니다.");
        else if(nickname.length <= 0)
            return new response(false, "닉네임은 1글자 이상이어야 합니다.");
        else if(nickname.length > 10)
            return new response(false, "닉네임은 10글자 이하이어야 합니다.");
        let err = null;
        await Account.findOne({
            where: {nickname: nickname}
        }).then(function(result) {
            if(result)
                err = "이미 존재하는 닉네임입니다.";
        });
        if(err)
            return new response(false, err);
        else
            return new response(true, null);
    },

    validatePassword: function (password){
        if(password.length < 6)
            return new response(false, "비밀번호는 6글자 이상이어야 합니다.");
        return new response(true, null);
    },

    equalPassword: function(password, password_check){
        if(password != password_check)
            return new response(false, "비밀번호가 일치하지 않습니다.");
        return new response(true, null);
    },

    check: async function(data){
      return new Promise(async (resolve, reject) => {
        var res_arr = 
        [await this.validateNickname(data.nickname), 
          await this.validateEmail(data.email), 
          this.validatePassword(data.password), 
          this.equalPassword(data.password, data.password_check)];
        for(i = 0; i < res_arr.length; i++){
            if(res_arr[i].res == false)
                return reject(res_arr[i].err);
        }
        return resolve();
      });
    },

    execute: async function(data){
      return new Promise(function(resolve, reject) {
        Account.create({
            nickname: data.nickname,
            password: data.password,
            email: data.email,
            alarm: data.alarm
        }).then(account => {
            resolve(account);
        });
      });
    }
}