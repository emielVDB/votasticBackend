/**
 * Created by emielPC on 20/11/16.
 */

var express = require('express');
var router = express.Router();


var constants = require("../../../models/constants");
var PollRequest = require('../../../models/requests/pollRequest');
var PollListResponse = require('../../../models/responses/pollListResponse');
var pollsService = require('../../../services/pollsService');

/* GET home page. */
router.get('/', function(req, res, next) {

    var promise = new pollsService.getTenRandomPolls();
    promise
    .then(function(savingResult){
        return PollListResponse.fromDBObjectArray(savingResult);
    }).then(function (pollResponse){
        res.json(pollResponse);
    }).
    catch(function (err) {
        console.error("ERR:", err);
    });
});


module.exports = router;
