/**
 * Created by emielPC on 15/11/16.
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
    userId: Schema.Types.ObjectId,
    title: String,
    tags: [String],
    pollsCount: Number
});

module.exports = mongoose.model("Page", schema);

