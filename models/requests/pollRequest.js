/**
 * Created by emielPC on 20/11/16.
 */
var Promise = require('promise');
function pollRequest() {

    var Poll = require("../poll");
    var self = this;
    this.question = "";
    this.options = [];
    this.tags = [];    
    
    this.fromInputObject = function (inputObject) {
        return new Promise(function(resolve, reject){
            if(typeof inputObject.question != "string") reject(new Error("Incorrect inputObject"));
            if( Object.prototype.toString.call( inputObject.tags ) === '[object Array]')reject(new Error("Incorrect inputObject"));
            if( Object.prototype.toString.call( inputObject.options ) === '[object Array]')reject(new Error("Incorrect inputObject"));

            self.question = inputObject.question;
            self.options = inputObject.options;
            self.tags = inputObject.tags;

            resolve(self);
        });
    };
    
    this.toPollObject = function () {
        return new Promise(function (resolve, reject) {
            var options = [];
            for(var loopnr = 0; loopnr < self.options.size; loopnr++){
                options.push({content: self.options[loopnr], votes: 0});
            }

            var poll = new Poll({
                question: self.question,
                options: options,
                votes: [],
                reactions: [],
                tags: self.tags
            });

            resolve(poll);
        });
    }
}

module.exports = pollRequest;

