/**
 * Created by emielPC on 20/11/16.
 */
var Promise = require('promise');
var mongoose = require('mongoose');
function pageRequest() {
    var self = this;
    this.pollId = "";
    this.maxUploadTime = 0;

    this.fromInputObject = function (inputObject) {
        return new Promise(function(resolve, reject){
            if(typeof inputObject.pollId != "string") reject(new Error("Incorrect inputObjectj"));

            self.pollId = inputObject.pollId;
            self.maxUploadTime = parseInt(inputObject.maxUploadTime);
            if(self.maxUploadTime == 0) self.maxUploadTime = Date.now();
            resolve(self);
        });
    };
}

module.exports = pageRequest;

