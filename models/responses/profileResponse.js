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
    this.birthDay;
    this.gender;
    this.followingPages= [];

    this.fromDBObject = function (inputObject) {
        return new Promise(function(resolve, reject){
            self._id = inputObject._id;
            self.birthDay = inputObject.birthDay.getTime();
            self.gender = inputObject.gender;
            self.followingPages = inputObject.followingPages;
            resolve(self);
        });
    };

}

module.exports = pageResponse;
