/**
 * Created by emielPC on 20/11/16.
 */
var Promise = require('promise');
var Poll = require('../models/poll');

function savePoll(poll) {
    return new Promise(function (resolve, reject) {
        poll.save(function (err, result) {
            if(err != null) reject(err);

            resolve(result);
        });
    });
}

function getTenRandomPolls() {
    return new Promise(function (resolve, reject) {
        Poll.findRandom({}, {}, {limit: 6}, function(err, results) {
            if (err) return reject(err);

            resolve(results); // 5 elements

        });
    });
}

function findPolls(findRequest) {
    return new Promise(function (resolve, reject) {
        var re = new RegExp(findRequest.text, 'i');
        Poll.find().
        or([{"question": { "$regex": re }},
            {"tags": { "$regex": re }}]).
        where('uploadTime').lt(findRequest.maxUploadTime).
        sort('-uploadTime').
        limit(6).
        exec(function(err, results) {
            if (err) return reject(err);

            resolve(results); // 5 elements

        });
    });
}

function findByPageIdList(pageIdList, maxUploadTime) {
    return new Promise(function (resolve, reject) {
        Poll.find({"pageId": { "$in": pageIdList}}).
        where('uploadTime').lt(maxUploadTime).
        sort('-uploadTime').
        limit(6).
        exec(function(err, results) {
            if (err) return reject(err);

            resolve(results); // 5 elements

        });
    });
}

function findByPageId(pageIdRequest) {
    return new Promise(function (resolve, reject) {
        Poll.find({"pageId": pageIdRequest.pageId}).
        where('uploadTime').lt(pageIdRequest.maxUploadTime).
        sort('-uploadTime').
        limit(6).
        exec(function(err, results) {
            if (err) return reject(err);

            resolve(results); // 5 elements

        });
    });
}

module.exports = {
    savePoll: savePoll,
    getTenRandomPolls: getTenRandomPolls,
    findPolls: findPolls,
    findByPageIdList: findByPageIdList,
    findByPageId: findByPageId
};