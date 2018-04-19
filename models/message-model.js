const mongoose = require('mongoose');

const moodsSchema = mongoose.Schema({
    message: String,
    senderName: String,
    receiverName: String,
    senderEmail: String,
    senderUsername: String,
    senderDob: String,
    senderGender: String,
    senderProfilePicture: String
});

const Message = module.exports = mongoose.model('Message', moodsSchema);

module.exports.newMessage = (newMessage, callback) => {
    console.log('Message', newMessage);
    newMood.save(callback);
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