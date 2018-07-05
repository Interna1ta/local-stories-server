'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Notification = require('../models/notification');

router.get('/:id/followers', (req, res, next) => {
  User.find({ "following" : req.params.id})
    .then((result)=>{
      return res.json(result);
    })
    .catch(next);
});

router.get('/:id/following', (req, res, next) => {
  User.findById(req.params.id).populate('following')
    .then((result) => {
      return res.json(result);
    })
    .catch(next);
});

router.get('/:id/notifications', (req, res, next) => {
  console.log(req.params.id, 'blabla');
  Notification.find({ "user": req.params.id }).populate('user').populate('created_by')
    .then((result) => {
      console.log(result);
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
  const options = {
    new: true
  }
  User.findByIdAndUpdate(req.body.idMe, { $push: { following: req.body.idUser}}, options)
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
  const options = {
    new: true
  }
  User.findByIdAndUpdate(req.body.idMe, { $pull: { following: req.body.idUser }}, options)
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

// router.post('/:id/checkFollowMe', (req, res, next) => {
//   const options = {
//     new: true
//   }
//   User.findById(req.params.id)
//     .then((user) => {
//       if (!user) {
//         return res.status(404).json({ code: 'not-found' })
//       }
//       console.log(user.following.length);
//       console.log(req.body.idMe);
//       user.following.find((element) => {
//         if (element == req.body.idMe) {
//           console.log('found!');
//           return res.json(true);
//         }
//       });

//       return res.json(false);
//     })
//     .catch(next);
// });

// router.put('/:id', (req, res, next) => {

//   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     return res.status(422).json({ code: 'unprocesable-entity' })
//   }

//   const newData = {
//     title: req.body.title,
//     year: req.body.year
//   }

//   const options = {
//     new: true
//   }

//   Movie.findById(req.params.id)
//     .then((result) => {
//       if (!result) {
//         return res.status(404).json({ code: 'not-found' })
//       }

//       result.title = newData.title;
//       result.year = newData.year;

//       return result.save()
//         .then(() => {
//           res.json(result);
//         })
//     })
//     .catch(next);
// });

module.exports = router;
