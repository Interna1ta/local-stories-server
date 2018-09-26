const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const router = express.Router();

const User = require('../models/user');

router.get('/me', (req, res, next) => {
  if (req.session.currentUser) { // @todo twitter change to req.user
    res.json(req.session.currentUser); // @todo twitter change to req.user
  } else {
    res.status(404).json({ code: 'not-found' });
  }
});

router.post('/login', (req, res, next) => {
  if (req.session.currentUser) { // @todo twitter change to req.user
    return res.status(401).json({ code: 'unauthorized' });
  }

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(422).json({ code: 'validation' });
  }
 
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ code: 'not-found' });
      }
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user; // @todo twitter change to req.login(user);
        return res.json(user);
      } else {
        return res.status(404).json({ code: 'not-found' });
      }
    })
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  if (req.session.currentUser) { // @todo twitter change to req.user
    return res.status(401).json({ code: 'unauthorized' });
  }

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(422).json({ code: 'validation' });
  }

  User.findOne({ username }, 'username')
    .then((userExists) => {
      if (userExists) {
        return res.status(422).json({ code: 'username-not-unique' });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = User({
        username,
        password: hashPass
      });

      return newUser.save()
        .then(() => {
          req.session.currentUser = newUser; // @todo twitter change to req.login(newUser);
          res.json(newUser);
        });
    })
    .catch(next);
});

router.post('/logout', (req, res) => {
  req.session.currentUser = null; // @todo twitter change to req.logout();
  return res.status(204).send();
});

router.get('/twitter/login', passport.authenticate('twitter'), (req,res,next) => {
});

router.get('/twitter/return', passport.authenticate('twitter'), (req, res, next) => {
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router; 