var express = require('express');
var router = express.Router();
const passport = require('passport');
const passportSetup = require('../config/passport-setup');
const Moods = require('../models/moods-model');
const config = require('../config/keys');
const tvShowDb = require('../models/tvshow-model');

var mdb = require('moviedb')(config.movieDb);


router.get('/', (req, res) => {
    res.render('home');
});

router.get('/discovertv', (req, res) => {
    // mdb.discoverTv({}, (err, data) => {
    //     if (err) {
    //         console.log('Cannot retrieve data from movie db.');
    //     }
    //     data.results.forEach(function (tvShow) { // response from moviedb
    //         tvShowDb.find({
    //             id: tvShow.id
    //         }, function (err, result) { // find if the tv show exists
    //             if (err) {
    //                 console.log(err);
    //             } else if (result.length < 1) { // if there is no entry in our db
    //                 var newTvShow = new tvShowDb(tvShow);
    //                 newTvShow.save(function (savingErr, savedTvShow) {
    //                     if (savingErr) {
    //                         console.log(savingErr);
    //                     }
    //                 });
    //             }
    //             if(result) {
    //                 res.json(result);
    //             }
    //         });
    //     });
    // });
    tvShowDb.find({}, function(err, tvshow) {
        res.json(tvshow);
    })
});

router.get('/discover/:id', (req, res) => {
    mdb.tvInfo({
        id: req.params.id
    }, (err, data) => {
        res.json(data);
    });
});


router.get('/getMood/:id', (req, res) => {
    console.log('Entered API.');
    Moods.find({
        mediaId: req.params.id
    }, (err, response) => {
        if (err) {
            console.log(err);
        }
        console.log(response);
        res.json(response);
    }).sort({
        time: -1
    });
    // Moods.getMood(mediaId, (err, response) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     res.json(response);
    // });
});

router.post('/postMood', (req, res) => {
    const newMood = {
        mediaId: req.body.mediaID,
        title: req.body.title,
        description: req.body.description,
        time: req.body.time,
        user: req.user
    }
    Moods.newMood(newMood, function (err, mood) {
        if (err) {
            res.json({
                message: 'Error posting the mood',
                success: false
            });
        }
        console.log('Mood', mood);
        res.json(mood);
    });
});

router.post('/vote', (req, res) => {

    Moods.findByIdAndUpdate(req.body.mediaId, vote, (err, response) => {
        cosnole.log(response);
    })
})

module.exports = router;