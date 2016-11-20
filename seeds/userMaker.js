/**
 * Created by emielPC on 15/11/16.
 */

var mongoose = require("mongoose");
var User = require("../models/user");
var constants = require("../models/constants");

mongoose.connect("localhost:27017/votastic");

var user = new User({
    accessToken: "mqlskdjfqmsdkfjoejfqseoijqseogmieqjrgmqoeirjgmoerigj",
    atExpirationDate: Date.now(),
    refreshToken: "qsdmlfkjqsdfpqosidvjpeoivjearpobierbpurhqlsdkjwsmdfjopzeaoifj",
    birthDay: Date.now(),
    gender: constants.FEMALE
});

user.save(function (err, result) {
    mongoose.disconnect();
});

