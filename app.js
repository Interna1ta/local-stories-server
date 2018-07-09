'use strict';

require('dotenv').config({path: './local-stories-server/.env'});

// -- NPM Packages

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cloudinary = require("cloudinary").v2;

const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;

// -- Setup Routes

const index = require('./routes/index');
const auth = require('./routes/auth')
const stories = require('./routes/stories')
const twitter = require('./routes/twitter')
const users = require('./routes/users')
const User = require('./models/user');

// -- Setup the App

const app = express();

// -- Connect the Database 

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

// -- Middlewares

app.use(cors({
  credentials: true,
  origin: [process.env.CLIENT_URL]
}));

const options = {
  consumerKey: process.env.TWITTER_CONSUMER_API_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: process.env.SERVER_URL + `/auth/twitter/return`
};
passport.use(new Strategy(options, (token, tokenSecret, profile, done) => {

  // User.findOne({ username: profile.username }, (err, user) => {
  //   if (err) {
  //     return done(err);
  //   }
  //   if (user) {
  //     return done(null, user);
  //   }

  //   const newUser = new User({
  //     username: profile.username,
  //     name: profile.displayName,

  //     // ???: token
  //     // ???: tokenSecret
  //   });

  //   newUser.save()
  //     .then(() => done(null, newUser))
  //     .catch(done);

  // });
  return callback(null, profile);
}));

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then(user => callback(null, user))
    .catch(callback);
});

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: 'some-string',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

// -- Routes

app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);
app.use('/twitter', twitter);
app.use('/users', users);

// -- Error Handler

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({ code: 'not-found' });
});

app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500).json({ code: 'unexpected' });
  }
});

module.exports = app;
