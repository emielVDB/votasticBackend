/**
 * Created by emielPC on 4/01/17.
 */
var expect = require("chai").expect;
var should = require('chai').should();
var request = require('supertest');

var app = require('../bin/www');
var agent = request.agent(app);

var mongoose = require('mongoose');
var User = require('../models/user');

var io = require('socket.io-client');


describe("auth", function () {
    before(function (done) {
        //mongo db op test (op localhost!!)
        User.remove({}, function (err) {
            if(err) return done(err);

            var user = new User({
                accessToken: makeid(50),
                atExpirationDate: Date.now() + 1,
                refreshToken: makeid(50),
                birthDay: Date.now(),
                gender: 0,
                followingPages: []
            });

            user.save(done);
        });

    });

    it("permission is denied", function (done) {
        agent
            .get('/api/my/profile')
            .expect(401)
            .end(function(err, res) {
                 if (err) return done(err);
                // res.body.should.have.property('users').and.be.instanceof(Array);
                done();
            });
    });

    it("permission is granted", function (done) {
        agent
            .get('/api/my/profile')
            .set({authorization:makeid(50)})
            .expect(200)
            .end(function(err, res) {
                 if (err) return done(err);
                // res.body.should.have.property('followingPages').and.be.instanceof(Array);
                done();
            });
    });

    it("socket login", function (done) {
        try {
            var socketURL = 'http://0.0.0.0:3000';
            var options = {
                transports: ['websocket'],
                'force new connection': true
            };

            var client1 = io.connect(socketURL, options);

            client1.on('connect', function (data) {
                client1.emit('authenticate', makeid(50));

            });
            client1.on("authenticate", function (msg) {
                expect(msg).to.equal("true");

            });
            done();

        }catch(err){
            done(err);
        }
    })
});



function makeid(count)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < count; i++ )
        text += possible.charAt(i);

    return text;
}