/**
 * Created by emielPC on 30/11/16.
 */
var PollResponse = require('./pollResponse');

fromDBObjectArray = function (inputObject, userId) {
    return new Promise(function (resolve, reject) {
        var itemsLeft = inputObject.length;
        var responses = [];
        if(itemsLeft == 0) resolve(responses);
        inputObject.forEach(function (item) {
            new PollResponse().fromDBObject(item, userId).then(function (pollResponseObject) {
                responses.push(pollResponseObject);
                itemsLeft--;
                if(itemsLeft == 0){
                    resolve(responses);
                }
            }).catch(function(err){
                reject(err);
            });
        })
    });

};

module.exports.fromDBObjectArray = fromDBObjectArray;


