var express = require('express');
var router = express.Router();
const passport = require('passport');
const passportSetup = require('../config/passport-setup');

var mdb = require('moviedb')('93fc3e24fc19362e1d839b8ea32d2d7f');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/discover', (req, res) => {
    mdb.discoverTv({}, (err, data) => {
        res.json(data);
    })
});

module.exports = router;