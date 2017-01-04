/**
 * Created by emielPC on 4/01/17.
 */
var expect = require("chai").expect;

var mongoose = require('mongoose');
var User = require('../models/user');

describe("user service", function () {
    var userService = require("../services/userService");
    var user;

    beforeEach(function (done) {
        //mongo db op test (op localhost!!)
        User.remove({}, function (err) {
            if (err) return done(err);

            user = new User({
                accessToken: makeid(50),
                atExpirationDate: Date.now() + 1,
                refreshToken: makeid(50),
                birthDay: Date.now(),
                gender: 0,
                followingPages: []
            });

            user.save(function (err, result) {
                if (err) return done(err);

                user = result;
                done();
            });
        });

    });


    it("get user by token", function (done) {
        userService.getUserByToken(user.accessToken).then(function (result) {
            try {
                expect(result).to.have.property('refreshToken')
                    .and.equal(user.refreshToken);
                expect(result).to.have.property('_id');

                expect(result._id.toString()).to.equal(user._id.toString());
            } catch (err) {
                return done(err);
            }


            done();
        });
    });

    it("get user by id", function (done) {
        userService.getUserById(user._id).then(function (result) {
            try {
                expect(result).to.have.property('refreshToken')
                    .and.equal(user.refreshToken);
                expect(result).to.have.property('_id');

                expect(result._id.toString()).to.equal(user._id.toString());
            } catch (err) {
                return done(err);
            }


            done();
        });
    });

    it("add follow", function (done) {
        userService.addFollow("586d18b5c359ff5de9c2c2ec", user._id).then(function (result) {
            try {
                expect(result).to.have.property('followingPages');

                expect(JSON.stringify(result.followingPages)).to.equal(JSON.stringify(["586d18b5c359ff5de9c2c2ec"]));


            } catch (err) {
                return done(err);
            }

            done();

        });
    });

    it("remove follow", function (done) {
        try {
            userService.addFollow("586d18b5c359ff5de9c2c2ec", user._id)
                .then(function (result) {
                    return userService.deleteFollow("586d18b5c359ff5de9c2c2ec", user._id);
                }).then(function (result) {
                expect(result).to.have.property('followingPages');

                expect(JSON.stringify(result.followingPages)).to.equal(JSON.stringify([]));

                done();
            });
        } catch (err) {
            return done(err);
        }
    });
});

function makeid(count) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < count; i++)
        text += possible.charAt(i);

    return text;
}