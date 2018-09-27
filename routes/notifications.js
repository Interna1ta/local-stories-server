'use strict';

const express = require('express');
const router = express.Router();
const uploadCloud = require('../configs/cloudinary.js');

const Notification = require('../models/notification.js');

const options = {
  new: true
}

router.get('/:id', (req, res, next) => {
  Notification.find({ "user": req.params.id })
    .populate('user')
    .populate('created_by')
    .then((result) => {
      return res.json(result);
    })
    .catch(next);
});

router.post('/:id/signup', (req, res, next) => {
  const message = "Welcome to Agora";
  const idUser = req.params.id;

  const newNotification = new Notification({
    user: idUser,
    created_by: idUser,
    message: message
  });

  newNotification.save()
    .then((result) => {
      res.status(201).json({ code: "okey" })
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

module.exports = router;
