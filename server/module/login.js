const { Account } = require('../models');
const bcrypt = require('bcryptjs');
var response = function(res, err, row = undefined){
    this.row = row;
    this.res = res;
    this.err = err;
}

module.exports = {
    // Check Email and Passwrod is valid
    check: async function(email, password){
        let [err, row] = [null, null];
        await Account.findOne({
            where: {email: email}
        }).then(function(result){
            row = result;
            if(!row){
                err = "이메일 또는 비밀번호가 잘못되었습니다.";
                return;
            }
            // Compares the password with hash(result.password)
            bcrypt.compare(password, row.password, function(err, res) {
                if(res == false)
                    err = "이메일 또는 비밀번호가 잘못되었습니다.";
            });
        });
        if(err)
            return new response(false, err);
        return new response(true, null, row);
    },

    execute: async function(data){
        var check_res = await this.check(data.email, data.password);
        return new Promise((resolve, reject) => {
            if(check_res.res == true)
                resolve(check_res.row);
            else
                reject(check_res.err);
        });
    }
}