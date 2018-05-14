'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');

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
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ code: 'not-found' })
      }

      user.following.push(req.body.idMe);

      return user.save()
        .then(() => {
          res.json(user);
        })
    })
    .catch(next);
});

router.put('/:id/unfollow', (req, res, next) => {
  const options = {
    new: true
  }
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ code: 'not-found' })
      }

      user.following.splice(req.body.idMe, 1);

      return user.save()
        .then(() => {
          res.json(user);
        })
    })
    .catch(next);
});

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
