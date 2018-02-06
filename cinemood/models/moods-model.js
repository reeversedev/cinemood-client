const mongoose = require('mongoose');

const moodsSchema = mongoose.Schema({
   title: String,
   updated_at: {
       type: String,
       default: Date.now
   },
   description: String
});

const Moods = module.exports = mongoose.model('Moods', moodsSchema);

module.exports.newMood = (newMood, callback) => {
    newMood.save(callback); 
}
module.exports.getMood = (Id, callback) => {
    Moods.find({mediaId: Id}, (err, response) => {
        if(err) {
            console.log(err);
        }
        callback(response);
    });
}