const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    firstname: String,
    username: String,
    token: String,
    content: String,


    

});

const User = mongoose.model('tweets', tweetSchema);

module.exports = User;