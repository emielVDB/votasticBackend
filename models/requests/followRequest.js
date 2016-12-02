/**
 * Created by emielPC on 1/12/16.
 */
var mongoose = require('mongoose');

function fromInput(pageId, userId) {
    return new Promise(function (resolve, reject) {
        var followRequest = {
            userId: mongoose.Types.ObjectId(userId),
            pageId: mongoose.Types.ObjectId(pageId)
        };

        resolve(followRequest);
    });
}

module.exports = {
    fromInput: fromInput
};