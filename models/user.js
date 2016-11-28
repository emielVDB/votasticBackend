/**
 * Created by emielPC on 15/11/16.
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
    accessToken: String,
    atExpirationDate: Date,
    refreshToken: String,
    birthDay: Date,
    gender: Number,
    followingPages: [Schema.Types.ObjectId]
});

module.exports = mongoose.model("User", schema);

