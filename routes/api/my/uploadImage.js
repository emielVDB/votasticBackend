/**
 * Created by emielPC on 20/11/16.
 */

var express = require('express');
var router = express.Router();

var multer  = require('multer');
var upload = multer({ dest: '../../../tmp/' });

var pollService = require("../../../services/pollsService");

var fs = require('fs'),
    S3FS = require('s3fs'),
    s3fsImpl = new S3FS('votastic', {
        region: "eu-central-1",
        accessKeyId: 'AKIAIBW4PIENTJ43372Q',
        secretAccessKey: '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'
    });

// Create our bucket if it doesn't exist


/* GET home page. */
router.post('/', upload.single('picture'), function(req, res, next) {

    pollService.getImagesFromPollById(req.query.pollId)
        .then(function (poll) {
            var file = req.file;
            var stream = fs.createReadStream(file.path);
            var imageIndex = parseInt(req.query.imageIndex);
            var imageId = poll.images[imageIndex];
            var newFileName = imageId+".jpg";

            var writeStream = s3fsImpl.createWriteStream(newFileName);
            writeStream.on('pipe', (src) => {
                console.log('something is piping into the writer');
            });
            var streamCallback = stream.pipe(writeStream);
            streamCallback.on('finish', function () {
                console.log("piping is done!");
                res.json("{uploaded: true}");
            });
        });
});


module.exports = router;
