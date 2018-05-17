'use strict';

const express = require('express');
const router = express.Router();

const Twitter = require('twitter');

router.post('/', (req, res, next) => {
   // @todo chek if user loggend in 

  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_API_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY, // @todo twitter req.session.currentUser.tokenKey,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET // @todo twitter req.session.current.tokenSecret
  });
  
  const tweet = req.body.text;

  // client.post('statuses/update', { status: 'I Love Twitter' }, function (error, tweet, response) {
  //   // if (error) throw error;
  //   console.log(tweet);  // Tweet body.
  //   // console.log(response);  // Raw response object.
  // });

  client.post('statuses/update', { status: tweet })
    .then((tweet) => {
      res.status(204).send();
    })
    .catch(next)
});

// router.get('/login', passport.authenticate('twitter'), (req, res, next) => {
//   console.log('inside db');
// });

// router.get('/login', passport.authenticate('twitter'));

// router.get('/return', passport.authenticate('twitter'), (req, res, next) => {

// });

module.exports = router;
