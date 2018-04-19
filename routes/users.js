const express = require('express');
const router = express.Router();
const passport = require('passport');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const User = require('../models/user-model');
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

router.get('/:username', (req, res) => {
    var userInfo = {};
    User.find({
        username: req.params.username
    }, (err, user) => {
        user.forEach((user) => {
            userInfo.name = user.name;
            userInfo.username = user.username;
            userInfo.email = user.email;
            userInfo.dob = user.dob;
            userInfo.gender = user.gender;
            userInfo.picture = user.profilePicture;
            // console.log(userInfo);
        });

        res.json(userInfo);
    })
});

module.exports = router;