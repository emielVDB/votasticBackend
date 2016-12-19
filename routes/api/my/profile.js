/**
 * Created by emielPC on 20/11/16.
 */

var express = require('express');
var router = express.Router();


var constants = require("../../../models/constants");
var ProfileResponse = require('../../../models/responses/profileResponse');
var userService = require('../../../services/userService');

/* GET home page. */
router.get('/', function(req, res, next) {
    var promise = userService.getUserById(req.userId);
    promise.then(function(dbResult){
        return new ProfileResponse().fromDBObject(dbResult);
    }).then(function (pollResponse){
        res.json(pollResponse);
    }).
    catch(function (err) {
        console.error("ERR:", err);
    });
});


module.exports = router;
