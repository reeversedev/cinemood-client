const express = require('express');
const router = express.Router();
const tvShow = require('../models/tvshow-model');
const config = require('../config/keys');
const mdb = require('moviedb')(config.movieDb);

router.get('/tvshow', (req, res) => {
    mdb.discoverTv({}, (err, tvshow) => {
        if(err) {
            console.log(err);
        }
        console.log(tvshow);
    });
});