/**
 * Created by emielPC on 20/11/16.
 */

var express = require('express');
var router = express.Router();


var constants = require("../../../models/constants");
var FindRequest = require('../../../models/requests/findRequest');
var PollListResponse = require('../../../models/responses/pollListResponse');
var pollsService = require('../../../services/pollsService');

/* GET home page. */
router.get('/', function(req, res, next) {
    var promise = new FindRequest().fromInputObject(req.query);
    promise.then(function (findRequest) {
        return pollsService.findPolls(findRequest);
    }).then(function(findResult){
        return PollListResponse.fromDBObjectArray(findResult);
    }).then(function (pollListResponse){
        res.json(pollListResponse);
    }).
    catch(function (err) {
        console.error("ERR:", err);
    });
});


module.exports = router;
