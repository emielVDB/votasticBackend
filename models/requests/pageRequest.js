/**
 * Created by emielPC on 20/11/16.
 */
var Promise = require('promise');
var mongoose = require('mongoose');
function pageRequest() {

    var Page = require("../page");
    var self = this;
    this.title = "";
    this.userId = "";
    this.tags = [];
    
    this.fromInputObject = function (inputObject, userId) {
        return new Promise(function(resolve, reject){
            if(typeof inputObject.title != "string") reject(new Error("Incorrect inputObjectj"));
            if( Object.prototype.toString.call( inputObject.tags ) != '[object Array]')reject(new Error("Incorrect inputObjectje"));

            self.title = inputObject.title;
            self.tags = inputObject.tags;
            self.userId = userId;
            resolve(self);
        });
    };
    
    this.toPageObject = function () {
        return new Promise(function (resolve, reject) {
            var page = new Page({
                title: self.title,
                userId:  mongoose.Types.ObjectId(self.userId),
                tags: self.tags,
                pollsCount: 0
            });

            resolve(page);
        });
    }
}

module.exports = pageRequest;

