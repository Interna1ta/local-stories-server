'use strict';

const express = require('express');
const router = express.Router();
const uploadCloud = require('../configs/cloudinary.js');

const User = require('../models/user');

const options = {
  new: true
}

router.get('/:id', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }

  User.findById(req.params.id)
    .then((result) => {
      return res.json(result);
    })
    .catch(next);
});

router.put('/:id/follow', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }

  User.findByIdAndUpdate(req.session.currentUser._id, { $push: { following: req.params.id}}, options)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ code: 'not-found' })
      }
      res.json(user);
    })
    .catch(next); 
});

router.put('/:id/unfollow', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }

  User.findByIdAndUpdate(req.session.currentUser._id, { $pull: { following: req.params.id }}, options)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ code: 'not-found' })
      }
      res.json(user);
    })
    .catch(next);
});

router.get('/:id/followers', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }

  User.find({ "following": req.params.id })
    .then((result) => {
      return res.json(result);
    })
    .catch(next);
});

router.get('/:id/following', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }

  User.findById(req.params.id)
    .populate('following')
    .then((result) => {
      return res.json(result);
    })
    .catch(next);
});

router.get('/:id/addfollowers', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }

  User.find()
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

router.put('/:id/edit', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }

  const newData = {
    name: req.body.name,
    username: req.body.username,
    description: req.body.description
  }

  User.findById(req.params.id, options)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ code: 'not-found' })
      }

      result.name = newData.name;
      result.username = newData.username;
      result.description = newData.description;

      return result.save()
        .then(() => {
          res.json(result);
        })
    })
    .catch(next);
});

router.put('/:id/image', uploadCloud.single('image'), (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }
  
  const userId = req.session.currentUser._id;
  const image = req.file.url;

  User.findByIdAndUpdate(userId, { profile_image_url: image }, options)
    .then((result) => {
      req.session.currentUser = result;
      res.json(result);
    })
    .catch(next);
});

module.exports = router;
