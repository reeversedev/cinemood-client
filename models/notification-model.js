const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    username: String,
    date: String,
    content: Object
});

module.exports = mongoose.model('Notification', notificationSchema);