const express = require('express');
const router = express.Router();
const passport = require('passport');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const BUCKET_NAME = 'image-example';
const IAM_USER_KEY = 'AKIAIROE7T4WUQSOTUWA';
const IAM_USER_SECRET = 'PKBM1+xxdrZ5iu2pxkhGCck9arCrFxJpqsuhV7kN';

AWS.config.update({
    secretAccessKey: IAM_USER_SECRET,
    accessKeyId: IAM_USER_KEY,
    region: 'us-east-1'
});

var s3 = new AWS.S3();

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'image-example',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname);
        },
        acl: 'public-read'
    })
});

router.post('/upload', upload.array('upl', 1), function (req, res) {
    var location;
    req.files.forEach(function (data) {
        var location = data.location;
        res.json({
            'url': location
        })
    });

});

module.exports = router;