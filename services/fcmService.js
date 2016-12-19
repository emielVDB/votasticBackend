/**
 * Created by emielPC on 18/12/16.
 */
var FCM = require('fcm-node');

var serverKey = 'AAAA0iqrOhU:APA91bECQaCqyUY82r3gi_3rYWcPMw_6dowAvn-k8M_SkUBzab01RtmsJMCViK1I3IEDEIs517y3chHdL2tAVwLKyl-oOHqOuMX_hHLu_HFix4g59Lqv0KHe1b_RuDX3dc6Ha23K0p_VXb2geFW3R61keSgWI4UyhQ';
var fcm = new FCM(serverKey);


function pollAddedToPage(poll) {
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: '/topics/newpollinpage_'+poll.pageId,

        data: {  //you can send only notification or only data(or include both)
            message: 'Poll added to '+poll.pageTitle
        }
    };

    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
}

module.exports = {
    pollAddedToPage: pollAddedToPage
};