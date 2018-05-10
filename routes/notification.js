const express = require('express');
const router = express.Router();
const redis = require('redis');
const client = redis.createClient();

router.get('/mate-request/:id', (req, res) => {
    const userId = req.params.id;
    client.hget('mate-request', userId, (err, mate) => {
        mate = JSON.parse(mate);
        res.json(mate);
    })
});

module.exports = router;