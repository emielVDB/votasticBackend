/**
 * Created by emielPC on 30/11/16.
 */
var PollResponse = require('./pollResponse');

fromDBObjectArray = function (inputObject) {
    return new Promise(function (resolve, reject) {
        if(inputObject == null) {
            resolve([]);
            return;
        }

        var responses = [];
        for(var loopnr = 0; loopnr < inputObject.reactions.length; loopnr++){
            var dbReaction = inputObject.reactions[loopnr];
            responses.push({content: dbReaction.content, uploadTime: dbReaction.uploadTime.getTime()})
        }

        resolve(responses)
    });

};

module.exports.fromDBObjectArray = fromDBObjectArray;


