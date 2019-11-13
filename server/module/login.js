const { Account } = require('../models');
const bcrypt = require('bcryptjs');
var response = function(res, err, row = undefined){
    this.res = res;
    this.err = err;
    this.row = row;
}

module.exports = {
    // Check Email and Passwrod is valid
    check: async function(email, password){
        return new Promise((resolve, reject) => {
            // Find email in DB
            Account.findOne({
                where: {email: email}
            }).then(function(row){
                if(!row)
                    reject(new response(false, "이메일 또는 비밀번호가 잘못되었습니다."));
                // Compares the password with hash(row.password)
                bcrypt.compare(password, row.password, function(error, res) {
                    if(!res){
                        console.log(0);
                        reject(new response(false, "이메일 또는 비밀번호가 잘못되었습니다."));
                    }else{
                        resolve(new response(true, null, row));
                    }
                });
            }).catch(function(error) {
                reject(new response(false, error));
            });
        });
    },

    execute: async function(data){
        var check_res = await this.check(data.email, data.password);
        return new Promise((resolve, reject) => {
            if(check_res.res === true){
                resolve(check_res.row);
            }else{
                reject(check_res.err);
            }
        });
    }
}