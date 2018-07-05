'use strict';

const express = require('express');
const router = express.Router();

const Story = require('../models/story');

router.get('/', (req, res, next) => {
  Story.find({})
    .populate('user')
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

router.get('/tweets', (req, res, next) => {
  Story.find({})
    .populate('user')
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

// router.get('/journal-entries/:id', (req, res, next) => {
//   Story.findById(req.params.id, (err, entry) => {
//     if (err) { return res.json(err).status(500); }
//     if (!entry) { return res.json(err).status(404); }

//     return res.json(entry);
//   });
// });

router.post('/', (req, res, next) => {
  
  const text = req.body.text;
  const userId = req.body.userId;

  if (!text) {
    return res.status(422).json({ code: 'unprocessable-entity' })
  }

  const newStory = new Story({
    text: text,
    user: userId,
    coordinates: null,
    enabled: true
  });

  newStory.save()
    .then((result) => {
      res.status(201).json({ code: "okey" })
    })
    .catch(next);

});

router.get('/users/:id', (req, res, next) => {
  const userId = req.params.id;
  Story.find({ user: userId })
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
