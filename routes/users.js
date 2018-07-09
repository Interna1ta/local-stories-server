'use strict';

const express = require('express');
const router = express.Router();
const uploadCloud = require('../configs/cloudinary.js');

const User = require('../models/user');
const Notification = require('../models/notification');

const options = {
  new: true
}

router.get('/:id/followers', (req, res, next) => {
  User.find({ "following" : req.params.id})
    .then((result)=>{
      return res.json(result);
    })
    .catch(next);
});

router.get('/:id/following', (req, res, next) => {
  User.findById(req.params.id)
    .populate('following')
    .then((result) => {
      return res.json(result);
    })
    .catch(next);
});

router.get('/:id/notifications', (req, res, next) => {
  Notification.find({ "user": req.params.id })
    .populate('user')
    .populate('created_by')
    .then((result) => {
      return res.json(result);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then((result) => {
      return res.json(result);
    })
    .catch(next);
});

router.put('/:id/follow', (req, res, next) => {
  User.findByIdAndUpdate(req.body.idMe, { $push: { following: req.body.idUser}}, this.options)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ code: 'not-found' })
      }
      res.json(user);
    })
    .catch(next);
});

router.post('/:id/follow', (req, res, next) => {
  const message = "started to follow you";
  const idUser = req.body.idUser;
  const idMe = req.body.idMe;

  const newNotification = new Notification({
    user: idUser,
    created_by: idMe,
    message: message
  });

  newNotification.save()
    .then((result) => {
      res.status(201).json({ code: "okey" })
    })
    .catch(next);
});

router.put('/:id/unfollow', (req, res, next) => {
  User.findByIdAndUpdate(req.body.idMe, { $pull: { following: req.body.idUser }}, this.options)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ code: 'not-found' })
      }
      res.json(user);
    })
    .catch(next);
});

router.get('/:id/checkFollow', (req, res, next) => {
  User.findById(req.params.id)
    .then((result) => {
      return res.json(result);
    })
    .catch(next);
});

router.put('/:id/edit', (req, res, next) => {
  const newData = {
    name: req.body.name,
    username: req.body.username,
    description: req.body.description
  }

  User.findById(req.params.id, this.options)
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
  const userId = req.session.currentUser._id;
  const image = req.file.url;

  User.findByIdAndUpdate(userId, { profile_image_url: image }, this.options)
    .then((result) => {
      console.log(result)
      req.session.currentUser = result;
      res.json(result);
    })
    .catch(next);
});

module.exports = router;
