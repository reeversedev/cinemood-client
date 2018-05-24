const express = require('express');
const router = express.Router();
const redis = require('redis');
const client = redis.createClient();
const User = require('../models/user-model');

router.get('/mate-request/:id', (req, res) => {
    const userId = req.params.id;
    client.hget('mate-request', userId, (err, mate) => {
        mate = JSON.parse(mate);
        res.json(mate);
    })
});
router.post('/add-mate', (req, res) => {
    const user = req.body.user;
    const sender = req.body.sender;
    User.findByIdAndUpdate(user._id, {$push: {friends: sender.id}}, (err, data) => {
        if(err) {
            console.log(err);
        }
        console.log('Added to friend list');
        // client.hdel('mate-request', user.id, (err, redis) => {
        //     console.log(redis);
        // });
        client.HDEL('mate-request', user.username, (err, redis) => {
            console.log(redis);
        })
    });
});

module.exports = router;