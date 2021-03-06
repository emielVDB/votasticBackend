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

function getPollById(pollId) {
    return new Promise(function (resolve, reject) {
        Poll.findOne({"_id": pollId}, function(err, results) {
            if (err) return reject(err);

            resolve(results);

        });
    });
}

function getImagesFromPollById(pollId) {
    return new Promise(function (resolve, reject) {
        Poll.findOne({"_id": pollId},{images: 1}, function(err, results) {
            if (err) return reject(err);

            resolve(results);

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

function addVote(pollId, voteIndex, userId) {

    return new Promise(function (resolve, reject) {
        var incObject = {};
        incObject['options.'+voteIndex+'.votes'] = 1;

        Poll.findByIdAndUpdate(
            pollId,
            {$push: {"votes": {
                userId: userId,
                voteIndex: voteIndex}},
            $inc: incObject},
            {safe: true, upsert: true, new : true},
            function(err, model) {
                if(err != null) return reject(err);

                resolve(model);
            }
        );
    });
}

function getReactions(getReactionRequest) {
    return new Promise(function (resolve, reject) {
        Poll.findOne(
            {
                _id: getReactionRequest.pollId,
                "reactions.uploadTime": {$lt: getReactionRequest.maxUploadTime}
            },


            {reactions: {$slice: 5}, _id: 0, tags: 0, votes: 0, uploadTime: 0, options:0},

            function (err, model) {
                if (err != null) return reject(err);

                resolve(model);
            });
    });
}

function addReaction(pollId, content, time, userId) {

    return new Promise(function (resolve, reject) {
        Poll.findByIdAndUpdate(
            pollId,
            {
                $push: {
                    "reactions": {
                        $each: [ {
                            content: content,
                            uploadTime: time
                        } ],
                        $position: 0
                    }
                }
            },
            {safe: true, upsert: true, new: true},
            function (err, model) {
                if (err != null) return reject(err);

                resolve(model);
            }
        );
    });
}

module.exports = {
    savePoll: savePoll,
    getTenRandomPolls: getTenRandomPolls,
    getPollById: getPollById,
    findPolls: findPolls,
    findByPageIdList: findByPageIdList,
    findByPageId: findByPageId,
    addVote: addVote,
    getReactions: getReactions,
    addReaction: addReaction,
    getImagesFromPollById: getImagesFromPollById
};