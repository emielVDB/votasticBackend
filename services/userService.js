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

function getUserById(idInput) {
    return new Promise(function (resolve, reject) {
        User.findOne({_id: idInput}, function (err, result) {
            if(err != null) reject(err);

            resolve(result);
        });
    });
}

function addFollow(pageId, userId) {
    return new Promise(function (resolve, reject) {
        User.findByIdAndUpdate(
            userId,
            {$push: {"followingPages": pageId}},
            {safe: true, upsert: true, new : true},
            function(err, model) {
                if(err != null) return reject(err);

                resolve(model);
            }
        );
    });
}

function deleteFollow(pageId, userId) {
    return new Promise(function (resolve, reject) {
        User.findByIdAndUpdate(
            userId,
            {
                $pull: {"followingPages": pageId},
                $pull: { "followingPages": { score: 8 , item: "B" } }
            },
            {safe: true, upsert: true, new : true},
            function(err, model) {
                if(err != null) return reject(err);

                resolve(model);
            }
        );
    });
}

function getFollows(userId) {
    return new Promise(function (resolve, reject) {
        User.findOne({_id: userId}, "followingPages", function (err, result) {
            if(err != null) reject(err);

            resolve(result.followingPages);
        });
    });
}

module.exports = {
    getUserByToken: getUserByToken,
    addFollow: addFollow,
    deleteFollow: deleteFollow,
    getFollows: getFollows,
    getUserById: getUserById
};