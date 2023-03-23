var express = require('express');
var router = express.Router();


require('../models/connection');
const Tweet = require('../models/tweet');




router.post('/saveTweet', (req, res) => {

    const newTweet = new Tweet({
        username: req.body.username,
        token: req.body.token,
        content: req.body.content
    });

    newTweet.save().then(datatweet => {
        res.json({ result: true, username: datatweet.username, content: datatweet.content });
    })
}
);
;


router.get('/showTweet/:token', (req, res) => {
    Tweet.findOne({ token: req.params.token }).then(data => {
        if (data) {
            res.json({ result: true, tweet: data.content, token: data.token });
        } else {
            res.json({ result: false, error: 'user not found' });
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