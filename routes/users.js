'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');

// router.get('/:id/followers', (req, res, next) => {
//   console.log('nenaza')
//   User.findById(req.params.id).populate('following')
//     .then((result) => {
//       console.log(result);
//       return res.json(result);
//     })
//     .catch(next);
// });

router.get('/:id/followers', (req, res, next) => {
  let users = [];
  // req.params.id
  User.find({ "following" : req.params.id}) //@TODO error fix late
    .then((result)=>{
      console.log(req.params.id)

      console.log(result);
      return res.json(result);
    })
    .catch(next);


  // User.find({})
  //   .then((result) => {
  //     result.forEach((user)=>{
  //       for (let i=0; i<user.following.length; i++) {
  //         if (user.following[i] == req.params.id) { 
  //           console.log('blablacar');
  //           users.push(user.following[i]);
  //         };
  //       };
  //     });
  //     console.log(users);
  //     return res.json(users);
  //   })
  //   .catch(next);
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

router.post('/:id/checkFollow', (req, res, next) => {
  const options = {
    new: true
  }
  console.log('joder funciona nena');
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ code: 'not-found' })
      }
      console.log(user.following.length);
      console.log(req.body.idMe);
      user.following.find((element) => {
        if (element == req.body.idMe) {
          console.log('found!');
          return res.json(true);
        }
      });

      return res.json(false);
    })
    .catch(next);
});

router.post('/:id/checkFollowMe', (req, res, next) => {
  const options = {
    new: true
  }
  console.log('joder funciona nena');
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ code: 'not-found' })
      }
      console.log(user.following.length);
      console.log(req.body.idMe);
      user.following.find((element) => {
        if (element == req.body.idMe) {
          console.log('found!');
          return res.json(true);
        }
      });

      return res.json(false);
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
