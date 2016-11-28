/**
 * Created by emielPC on 21/11/16.
 */

var Promise = require('promise');
var User = require('../models/user');

function getUserByToken(tokenInput) {
    return new Promise(function (resolve, reject) {
        User.findOne({accessToken: tokenInput}, function (err, result) {
            if(err != null) reject(err);

            resolve(result);
        });
    });
}

module.exports = {
    getUserByToken: getUserByToken
};