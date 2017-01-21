/**
 * Created by emielPC on 20/11/16.
 */
/**
 * Created by emielPC on 20/11/16.
 */
function pollResponse() {
    var Promise = require('promise');
    var Poll = require("../poll");
    var self = this;
    this._id = "";
    this.question = "";
    this.tags = [];
    this.options = [];
    this.choiceIndex = -1; // -1 = geen keuze
    this.totalVotes = 0;
    this.totalReactions = 0;
    this.uploadTime = 0;
    this.pageId = null;
    this.pageTitle = null;
    this.images = [];

    this.fromDBObject = function (inputObject, userId) {
        return new Promise(function(resolve, reject){
            self.question = inputObject.question;
            self._id = inputObject._id;
            self.tags = inputObject.tags;
            self.options = inputObject.options;
            self.uploadTime = inputObject.uploadTime.getTime();
            self.pageId = inputObject.pageId;
            self.pageTitle = inputObject.pageTitle;
            self.images = inputObject.images;

            for(var loopnr = 0; loopnr < inputObject.votes.length && self.choiceIndex == -1; loopnr++){
                if(userId == inputObject.votes[loopnr].userId){
                    self.choiceIndex = inputObject.votes[loopnr].voteIndex;

                }
            }

            resolve(self);

        });
    };


}

module.exports = pollResponse;
