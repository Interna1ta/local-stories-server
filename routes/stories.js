'use strict';

const express = require('express');
const router = express.Router();

const Story = require('../models/story');

router.get('/', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }

  Story.find({ enabled: true })
    .sort({ created_at: -1 })
    .limit(10)
    .populate('user')
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }

  Story.findById(req.params.id)
    .populate('user')
    .then((result) => {
      return res.json(result);
    })
    .catch(next);
});

router.put('/:id/delete', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }

  Story.findByIdAndUpdate(req.params.id, { enabled: false }, this.options)
    .then((story) => {
      if (!story) {
        return res.status(404).json({ code: 'not-found' })
      }
      res.json(story);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }
  
  const text = req.body.text;
  const userId = req.body.userId;

  if (!text) {
    return res.status(422).json({ code: 'unprocessable-entity' })
  }

  const newStory = new Story({
    text: text,
    user: userId,
    enabled: true
  });

  newStory.save()
    .then((result) => {
      res.status(201).json({ code: "okey" })
    })
    .catch(next);

});

router.get('/users/:id', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }

  Story.find({ user: req.params.id, enabled: true })
  .populate('user')
    .then((result) => { 
      return res.json(result);
    })
    .catch(next);
});

module.exports = router;
