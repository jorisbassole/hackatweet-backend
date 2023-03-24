var express = require('express');
var router = express.Router();


require('../models/connection');
const Tweet = require('../models/tweet');




router.post('/saveTweet', (req, res) => {

    const newTweet = new Tweet({
        firstname:req.body.firstname,
        username: req.body.username,
        token: req.body.token,
        content: req.body.content,
    
    });

    newTweet.save().then(datatweet => {
        res.json({ result: true, username: datatweet.username, content: datatweet.content});
    })
}
);
;


router.get('/showTweets', (req, res) => {
    Tweet.find()
    .then(tweets => {
        if (tweets) {
            res.json({tweets});
        } else {
            res.json({ result: false});
        }
    });
});

router.delete('/deleteTweet/:tweet', (req, res) => {
    Tweet
    .deleteOne({ content: req.params.tweet })
    .then(({ deletedCount }) => {
    Tweet
    .find({ content: req.params.tweet })
    .then(data => {
            res.json({ result: deletedCount > 0, data })
        })
    })
})


module.exports = router