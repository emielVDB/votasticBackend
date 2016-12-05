/**
 * Created by emielPC on 1/12/16.
 */
var mongoose = require('mongoose');

function fromInput(inputObject) {
    return new Promise(function (resolve, reject) {
        var newsRequest = {
            pageId: mongoose.Types.ObjectId(inputObject.pageId),
            maxUploadTime: parseInt(inputObject.maxUploadTime)
        };
        if(newsRequest.maxUploadTime == 0) newsRequest.maxUploadTime = Date.now();

        resolve(newsRequest);
    });
}

module.exports = {
    fromInput: fromInput
};



