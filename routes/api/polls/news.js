/**
 * Created by emielPC on 20/11/16.
 */

var express = require('express');
var router = express.Router();


var constants = require("../../../models/constants");
var NewsRequest = require('../../../models/requests/newsRequest');
var PollListResponse = require('../../../models/responses/pollListResponse');
var pollsService = require('../../../services/pollsService');
var usersService = require('../../../services/userService');

/* GET home page. */
router.get('/', function(req, res, next) {
    var newsRequest;
    var promise = NewsRequest.fromInput(req.query, req.userId);
    promise.then(function (newsReq) {
        newsRequest = newsReq;
        return usersService.getFollows(req.userId);
    }).then(function(pageIdList){
        return pollsService.findByPageIdList(pageIdList, newsRequest.maxUploadTime)
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
