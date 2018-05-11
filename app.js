'use strict';

require('dotenv').config({path: './server/.env'});

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

// -- Setup Routes

const index = require('./routes/index');
const auth = require('./routes/auth')
const stories = require('./routes/stories')
const twitter = require('./routes/twitter')

// -- Setup the App

const app = express();

// -- Connect the Database 

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, {
// mongoose.connect('mongodb://localhost/local-stories', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

// -- Middlewares

app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200']
}));

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

// -- Routes

app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);
app.use('/twitter', twitter);

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
