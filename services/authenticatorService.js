/**
 * Created by emielPC on 21/11/16.
 */
var userService = require("./userService");
function authenticate(req, res, next) {
    if(req.url == "/api/user/register"){
        next();
        return;
    }
    // check header or url parameters or post parameters for token
    var token = req.headers['authorization'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        var promise = userService.getUserByToken(token);
        promise.then(function (result) {

            req.userId = result._id;
            next();
        }).catch(function (err) {
            return res.status(401).send({
                success: false,
                message: 'No token provided.'
            });
        });
    } else {
        // if there is no token
        // return an error
        return res.status(401).send({
            success: false,
            message: 'No token provided.'
        });

    }
}

module.exports = authenticate;