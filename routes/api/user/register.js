/**
 * Created by emielPC on 15/11/16.
 */
var express = require('express');
var router = express.Router();

var User = require("../../../models/user");
var constants = require("../../../models/constants");

/* GET home page. */
router.post('/', function(req, res, next) {
    var gender = parseInt(req.body.gender);
    // var birthDay = new Date(req.body.birthDay);
    var birthDay = new Date(parseInt(req.body.birthDay));

    var user = new User({
        accessToken: makeid(50),
        atExpirationDate: Date.now() + 1,
        refreshToken: makeid(50),
        birthDay: birthDay,
        gender: gender,
        followingPages: []
    });

    user.save(function (err, result) {

        res.json({"accessToken": result.accessToken,
            "atExpirationDate": result.atExpirationDate.getTime(),
            "refreshToken": result.refreshToken,
            "_id" : result._id});
    });
});

module.exports = router;

function makeid(count)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < count; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}