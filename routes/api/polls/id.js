/**
 * Created by emielPC on 20/11/16.
 */

var express = require('express');
var router = express.Router();


var constants = require("../../../models/constants");
var PollResponse = require('../../../models/responses/pollResponse');
var pollsService = require('../../../services/pollsService');

/* GET home page. */
router.get('/', function(req, res, next) {

    var promise = pollsService.getPollById(req.query.pollId);
    promise.then(function(findResult){
        return new PollResponse().fromDBObject(findResult, req.userId);
    }).then(function (pollResponse){
        res.json(pollResponse);
    }).
    catch(function (err) {
        console.error("ERR:", err);
    });

});

module.exports = router;
