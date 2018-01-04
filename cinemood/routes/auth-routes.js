const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user-model');
const config = require('../config/keys');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Failed to register the user'
            });
        } else {
            res.json({
                success: true,
                msg: 'User registered'
            });
        }
    })
});

router.post('/authenticate', function (req, res, next) {
    require('../config/passport-setup')(passport);

    var username = req.body.username;
    var password = req.body.password;

    User.getUserByUsername(username, function (err, user) {
        if (err) throw err;
        if (!user) {
            return res.json({
                success: false,
                msg: 'User not found'
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
                    }
                });
            } else {
                return res.json({
                    success: false,
                    msg: 'Wrong Password'
                });
            }
        })
    })
});
router.get('/profile', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    res.json({
        user: req.user
    });
});

module.exports = router;