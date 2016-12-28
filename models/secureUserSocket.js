/**
 * Created by emielPC on 5/12/16.
 */
var userService = require("../services/userService");
var pollsService = require("../services/pollsService");

function secureSocketUser(socket) {
    var self = this;
    this.userId = "";
    this.isAuthenticated = false;
    this.connectionTime = Date.now();
    this.socket = socket;

    socket.on('authenticate', function(msg){
        console.log('trying to authenticate: ' + msg);

        var promise = userService.getUserByToken(msg);
        promise.then(function (result) {
            if(result == null || result === ""){
                self.socket.emit("authenticate", "false");
                return;
            }

            self.userId = result._id;
            self.isAuthenticated = true;

            self.socket.removeAllListeners('authenticate');
            self.socket.on("voteSubmit", voteSubmit);
            self.socket.on("reactionSubmit", reactionSubmit);
            self.socket.on("join", join);

            self.socket.emit("authenticate", "true");
        }).catch(function (err) {
            throw err;
        })
    });
    
   function join(roomName) {
       self.socket.join(roomName);
   }

    function voteSubmit(voteRequest) {
        voteRequest = JSON.parse(voteRequest);


        pollsService.addVote(voteRequest.pollId, voteRequest.voteIndex, self.userId);
        //controleren als nog niet gestemd is ==> later

        self.socket.broadcast
            .to('poll'+voteRequest.pollId)
            .emit('poll'+voteRequest.pollId, JSON.stringify({kind: "vote", voteResponse:{voteIndex: voteRequest.voteIndex}}));

    }

    function reactionSubmit(msg) {
        reactionRequest = JSON.parse(msg);

    }

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
}

module.exports = secureSocketUser;