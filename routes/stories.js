'use strict';

const express = require('express');
const router = express.Router();

const Story = require('../models/story');

router.get('/', (req, res, next) => {
  Story.find({ enabled: true })
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

router.put('/:id/delete', (req, res, next) => {
  //   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  //     return res.status(422).json({ code: 'unprocesable-entity' })
  //   }
  Story.findByIdAndUpdate(req.params.id, { enabled: false }, this.options)
    .then((story) => {
      if (!story) {
        return res.status(404).json({ code: 'not-found' })
      }
      res.json(story);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Story.findById(req.params.id)
    .populate('user')
    .then((result) => {
      return res.json(result);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  
  const text = req.body.text;
  const userId = req.body.userId;
  const coordinates = req.body.coordinates;

  if (!text) {
    return res.status(422).json({ code: 'unprocessable-entity' })
  }

  const newStory = new Story({
    text: text,
    user: userId,
    // coordinates: {
    //   lat: coordinates.lat, 
    //   lon: coordinates.lon
    // },
    // city: 'Barcelona',
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
  Story.find({ user: userId, enabled: true })
  .populate('user')
    .then((result) => { 
      return res.json(result);
    })
    .catch(next);
});

module.exports = router;
