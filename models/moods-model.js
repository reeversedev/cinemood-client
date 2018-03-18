const mongoose = require('mongoose');

const moodsSchema = mongoose.Schema({
  mediaId: String,
  title: String,
  description: String,
  time: Date
});

const Moods = module.exports = mongoose.model('Moods', moodsSchema);

module.exports.newMood = (newMood, callback) => {
    console.log('Models', newMood);
    newMood.save(callback); 
}
module.exports.getMood = (Id, callback) => {
    Moods.find({mediaId: Id}, (err, response) => {
        if(err) {
            console.log(err);
        }
        console.log(response);
        callback(response);
    });
}