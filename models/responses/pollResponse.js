/**
 * Created by emielPC on 20/11/16.
 */
/**
 * Created by emielPC on 20/11/16.
 */
function pollRequest() {
    var Promise = require('promise');
    var Poll = require("../models/poll");
    var self = this;
    this._id = "";
    this.question = "";
    this.tags = [];
    this.options = [];
    this.choiceIndex = -1; // -1 = geen keuze
    this.totalVotes = 0;
    this.totalReactions = 0;

    this.fromDBObject = function (inputObject) {
        return new Promise(function(resolve, reject){
            self.question = inputObject.question;
            self._id = inputObject._id;
            self.tags = inputObject.tags;
            self.options = inputObject.options;

            resolve(self);
        });
    };

}

module.exports = pollRequest;
