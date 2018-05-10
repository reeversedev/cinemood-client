const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passport-setup')(passport);

const jwt = require('jsonwebtoken');
const User = require('../models/user-model');
const config = require('../config/keys');
const redis = require('redis');
const client = redis.createClient();

router.post('/signup', (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        dob: req.body.dob,
        gender: req.body.gender,
        profilePicture: req.body.profilePicture
    });
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Something Bad happened.'
            });
        } else {
            res.json({
                success: true,
                msg: 'Yay! Registered Successfully. You can now Signin'
            });
        }
    })
});

router.post('/signin', function (req, res, next) {
    require('../config/passport-setup')(passport);

    var username = req.body.username;
    var password = req.body.password;

    User.getUserByUsername(username, function (err, user) {
        if (err) throw err;
        if (!user) {
            return res.json({
                success: false,
                msg: 'Sorry, We are unable to recognize you',
                helpMsg: 'Please check the credentials'
            });
        }
        User.comparePassword(password, user.password, function (err, isMatch) {
            if (err) throw err;
            if (isMatch) {
                console.log('Reached IsMatch');
                var token = jwt.sign({
                    data: user
                }, config.secret, {
                    expiresIn: 604800 //1 Week
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    },
                    msg: 'Welcome, '
                });
            } else {
                return res.json({
                    success: false,
                    msg: 'Wrong Password',
                });
            }
        })
    })
});
router.get('/profile', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    let mate = client.hget('mate-request', req.user.username,(err, mateRequest) => {
        res.json({
            user: req.user,
            mateRequest: mateRequest
        });
    });
});
router.post('accept-request',  (req, res) => {
    User.findByIdAndUpdate();
})

// router.get('/mate-requests', (req, res) => {
//     console.log('User is:' + req.user);
    
//     // client.hget('mate-request', (err, requests) => {
//     //     console.log(requests);
//     // });
// });

module.exports = router;