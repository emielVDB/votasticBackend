/**
 * Created by emielPC on 20/11/16.
 */

var express = require('express');
var router = express.Router();

var multer  = require('multer');
var upload = multer({ dest: '../../../uploads/' });

const fs = require('fs');

var pollService = require("../../../services/pollsService");


/* GET home page. */
router.post('/', upload.single('picture'), function(req, res, next) {

    pollService.getImagesFromPollById(req.query.pollId)
        .then(function (poll) {

            fs.readFile(req.file.path, function (err, data) {
                var imageIndex = parseInt(req.query.imageIndex);
                var imageId = poll.images[imageIndex];
                var newPath = "public/images/"+imageId+".jpg";
                fs.writeFile(newPath, data, function (err) {
                    res.json("done");
                });
            });
        });
});


module.exports = router;
