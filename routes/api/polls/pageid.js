/**
 * Created by emielPC on 20/11/16.
 */
var express = require('express');
var router = express.Router();

var PollsInPageRequest = require('../../../models/requests/pollsInPageRequest');
var PollListResponse = require('../../../models/responses/pollListResponse');
var pollsService = require('../../../services/pollsService');
var usersService = require('../../../services/userService');

/* GET home page. */
router.get('/', function(req, res, next) {
    var promise = PollsInPageRequest.fromInput(req.query);
    promise.then(function (pollsInPReq) {
        return pollsService.findByPageId(pollsInPReq);
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
