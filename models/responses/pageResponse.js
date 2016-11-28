/**
 * Created by emielPC on 20/11/16.
 */
/**
 * Created by emielPC on 20/11/16.
 */
function pageResponse() {
    var Promise = require('promise');
    var self = this;
    this._id = "";
    this.title = "";
    this.tags = [];
    this.pollsCount = 0;

    this.fromDBObject = function (inputObject) {
        return new Promise(function(resolve, reject){
            self.title = inputObject.title;
            self._id = inputObject._id;
            self.tags = inputObject.tags;
            self.pollsCount = inputObject.pollsCount;
            resolve(self);
        });
    };

}

module.exports = pageResponse;
