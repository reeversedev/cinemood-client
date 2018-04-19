const mongoose = require('mongoose');

const moodsSchema = mongoose.Schema({
    mediaId: String,
    title: String,
    description: String,
    time: Date,
    user: Object,
    votes: Number
});

const Moods = module.exports = mongoose.model('Moods', moodsSchema);

module.exports.newMood = (newMood, callback) => {
    console.log('Models', newMood);
    newMood.save(callback);
}
module.exports.vote = (id, vote, callback) => {
    Moods.findByIdAndUpdate(id, vote, (err, res) => {
        console.log(JSON.stringify(res));
    });
}
module.exports.getMood = (Id, callback) => {
    Moods.find({
        mediaId: Id
    }, (err, response) => {
        if (err) {
            console.log(err);
        }
        console.log(response);
        callback(response);
    });
}