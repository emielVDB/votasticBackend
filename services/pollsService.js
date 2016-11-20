/**
 * Created by emielPC on 20/11/16.
 */
var Promise = require('promise');

function savePoll(poll) {
    return new Promise(function (resolve, reject) {
        poll.save(function (err, result) {
            if(err != null) reject(err);

            resolve(result);
        });
    });
}

module.exports = {
    savePoll: savePoll
};