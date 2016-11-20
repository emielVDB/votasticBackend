/**
 * Created by emielPC on 20/11/16.
 */

var express = require('express');
var router = express.Router();


var constants = require("../../../models/constants");
var PollRequest = require('../../../models/requests/pollRequest');
var PollResponse = require('../../../models/responses/pollResponse');
var pollsService = require('../../../services/pollsService');

/* GET home page. */
router.post('/', function(req, res, next) {

    console.log(JSON.stringify(req.body));
    // try{
    //     var promise = new PollRequest().fromInputObject(req.body);
    // }catch (err){
    //     res.json({
    //         "_id": "",
    //         "question": "",
    //         "tags": [],
    //         "options": [],
    //         "choiceIndex": -1, // -1 ": geen keuze
    //         "totalVotes": 0,
    //         "totalReactions": 0
    //     });
    // }
    //
    // promise.then(function(pollRequest){
    //     return pollRequest.toPollObject();
    // }).then(function (poll) {
    //     return pollsService.savePoll(poll);
    // }).then(function(savingResult){
    //     return new PollResponse().fromDBObject(savingResult);
    // }).then(function (pollResponse){
    //     res.json(pollResponse);
    // }).
    // catch(function (err) {
    //     console.error("ERR:", err);
    // });

    res.json({
        "_id": "",
        "question": "",
        "tags": [],
        "options": [],
        "choiceIndex": -1, // -1 ": geen keuze
        "totalVotes": 0,
        "totalReactions": 0
    });

});


module.exports = router;
