'use strict';

const express = require('express');
const router = express.Router();

const Article = require('../models/article');

router.get('/:id', (req, res, next) => {
  Article.findById(req.params.id)
    .populate('user')
    .then((result) => {
      return res.json(result);
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  Article.find({})
    .populate('user')
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

// router.get('/tweets', (req, res, next) => {
//   Article.find({})
//     .populate('user')
//     .then((result) => {
//       res.json(result);
//     })
//     .catch(next);
// });

// router.get('/journal-entries/:id', (req, res, next) => {
//   Story.findById(req.params.id, (err, entry) => {
//     if (err) { return res.json(err).status(500); }
//     if (!entry) { return res.json(err).status(404); }

//     return res.json(entry);
//   });
// });

router.post('/', (req, res, next) => {

  const title = req.body.title;
  const text = req.body.text;
  const userId = req.body.userId;

  console.log('im inside');

  if (!text || !title) {
    return res.status(422).json({ code: 'unprocessable-entity' })
  }

  const newArticle = new Article({
    title: title,
    text: text,
    user: userId,
    coordinates: null,
    enabled: true
  });

  newArticle.save()
    .then((result) => {
      res.status(201).json({ code: "okey" })
    })
    .catch(next);

});

router.get('/users/:id', (req, res, next) => {
  const userId = req.params.id;
  Article.find({ user: userId })
    .populate('user')
    .then((result) => {
      return res.json(result);
    })
    .catch(next);
});

// router.delete('/:id', (req, res, next) => {

//   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     return res.status(422).json({ code: 'unprocesable-entity' })
//   }

//   Story.findById(req.params.id)
//     .then((result) => {
//       if (!result) {
//         return res.status(404).json({ code: 'not-found' })
//       }

//       return result.remove()
//         .then(() => {
//           res.json(result);
//         })
//     })
//     .catch(next);
// });

module.exports = router;
