/**
 * Created by emielPC on 20/11/16.
 */

var express = require('express');
var router = express.Router();


var constants = require("../../../models/constants");
var PageRequest = require('../../../models/requests/pageRequest');
var PageResponse = require('../../../models/responses/pageResponse');
var pageService = require('../../../services/pageService');

/* GET home page. */
router.post('/', function(req, res, next) {

    console.log(JSON.stringify(req.body));

    var promise = new PageRequest().fromInputObject(req.body, req.userId);
    promise.then(function(pageRequest){
        return pageRequest.toPageObject();
    }).then(function (page) {
        return pageService.savePage(page);
    }).then(function(savingResult){
        return new PageResponse().fromDBObject(savingResult, req.userId);
    }).then(function (pageResponse){
        res.json(pageResponse);
    }).
    catch(function (err) {
        console.error("ERR:", err);
    });
});


module.exports = router;
