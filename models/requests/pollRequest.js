/**
 * Created by emielPC on 20/11/16.
 */
var Promise = require('promise');
var mongoose = require('mongoose');
var pageService = require('../../services/pageService');

function pollRequest() {

    var Poll = require("../poll");
    var self = this;
    this.question = "";
    this.userId = "";
    this.options = [];
    this.tags = [];
    this.pageId = "";
    this.numberOfImages = 0;
    
    this.fromInputObject = function (inputObject, userId) {
        return new Promise(function(resolve, reject){
            if(typeof inputObject.question != "string") reject(new Error("Incorrect inputObjectj"));
            if( Object.prototype.toString.call( inputObject.options ) != '[object Array]')reject(new Error("Incorrect inputObjectjek"));

            self.question = inputObject.question;
            self.options = inputObject.options;
            self.tags = inputObject.tags;
            self.userId = userId;
            self.uploadTime = Date.now();
            self.pageId = inputObject.pageId;
            self.numberOfImages = inputObject.numberOfImages;
            resolve(self);
        });
    };
    
    this.toPollObject = function () {
        return new Promise(function (resolve, reject) {
            var options = [];
            var imageIds = [];
            var pageId = null;
            var pageTitle = null;
            for(var loopnr = 0; loopnr < self.options.length; loopnr++){
                options.push({content: self.options[loopnr], votes: 0});
            }

            for(loopnr = 0; loopnr < self.numberOfImages; loopnr++){
                imageIds.push(makeid(30));
            }

            if(self.pageId == null){
                returnPoll();
            }else {
                //todo: pageName ophalen van pageId, reject als niet van de juiste user is
                pageService.getPageById(self.pageId)
                    .then(function (result) {
                        if (result == null) {
                            return reject(new Error("Page id not correct"));
                        }
                        if (result.userId.toString() != self.userId) {
                            return reject(new Error("can't add a poll to someone elses page"));
                        }

                        pageId = mongoose.Types.ObjectId(self.pageId);
                        pageTitle = result.title;

                        returnPoll();
                    }).catch(function (err) {
                    reject(err);
                });
            }

            function returnPoll() {
                var poll = new Poll({
                    question: self.question,
                    userId: mongoose.Types.ObjectId(self.userId),
                    options: options,
                    votes: [],
                    reactions: [],
                    tags: self.tags,
                    uploadTime: self.uploadTime,
                    pageId: pageId,
                    pageTitle: pageTitle,
                    images: imageIds
                });

                resolve(poll);
            }
        });
    }

}

function makeid(count)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < count; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

module.exports = pollRequest;

