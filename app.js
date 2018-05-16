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

const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;


// passport.authenticate('twitter') { failureRedirect: PATH }

// -- Setup Routes

const index = require('./routes/index');
const auth = require('./routes/auth')
const stories = require('./routes/stories')
const twitter = require('./routes/twitter')
const users = require('./routes/users')

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

passport.use(new Strategy({
  consumerKey: process.env.TWITTER_CONSUMER_API_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: 'http://localhost:3000/auth/twitter/return'
}, function(token, tokenSecret, profile, callback) {
    return callback(null, profile);
}));

passport.serializeUser(function(user, callback) {
  callback(null, user);
})

passport.deserializeUser(function(obj, callback) {
  callback(null, obj);
})

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
