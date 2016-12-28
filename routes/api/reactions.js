/**
 * Created by emielPC on 20/11/16.
 */

var express = require('express');
var router = express.Router();


var constants = require("../../models/constants");
var GetReactionRequest = require('../../models/requests/getReactionsRequest');
var ReactionListResponse = require('../../models/responses/pollListResponse');
var pollsService = require('../../services/pollsService');

/* GET home page. */
router.get('/', function(req, res, next) {
    var promise = new GetReactionRequest().fromInputObject(req.query);
    promise.then(function (getReactionRequest) {
        return pollsService.getReactions(getReactionRequest);
    }).then(function(findResult){
        return ReactionListResponse.fromDBObjectArray(findResult);
    }).then(function (pollListResponse){
        res.json(pollListResponse);
    }).
    catch(function (err) {
        console.error("ERR:", err);
    });
});

module.exports = router;
