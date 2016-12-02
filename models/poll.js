/**
 * Created by emielPC on 20/11/16.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var random = require('mongoose-simple-random');

var schema = new Schema({
    userId: Schema.Types.ObjectId,
    question: String,
    options: [{
        content: String,
        votes: Number
    }],

    votes: [{
        userId: String,
        voteIndex: Number
    }],

    reactions: [String],
    tags: [String],
    uploadTime: Date,

    pageId: Schema.Types.ObjectId,
    pageTitle: String
});
schema.plugin(random);

module.exports = mongoose.model("Poll", schema);
