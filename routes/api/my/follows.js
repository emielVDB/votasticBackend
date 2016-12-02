/**
 * Created by emielPC on 20/11/16.
 */

var express = require('express');
var router = express.Router();


var constants = require("../../../models/constants");
var FollowRequest = require('../../../models/requests/followRequest');
var userService = require('../../../services/userService');

/* GET home page. */
router.post('/', function(req, res, next) {

    var promise = FollowRequest.fromInput(req.query.pageId, req.userId);
    promise.then(function(followRequest){
        return userService.addFollow(followRequest.pageId, followRequest.userId)
    }).then(function (user) {
        res.json("ok");
    }).catch(function (err) {
        console.error("ERR:", err);
    });
});
router.delete('/', function(req, res, next) {

    var promise = FollowRequest.fromInput(req.query.pageId, req.userId);
    promise.then(function(followRequest){
        return userService.deleteFollow(followRequest.pageId, followRequest.userId)
    }).then(function (user) {
        res.json("ok");
    }).catch(function (err) {
        console.error("ERR:", err);
    });
});


module.exports = router;
