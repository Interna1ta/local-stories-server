'use strict';

const express = require('express');
const router = express.Router();

const Article = require('../models/article');

router.put('/:id/delete', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }

  Article.findByIdAndUpdate(req.params.id, { enabled: false }, this.options)
    .then((article) => {
      if (!article) {
        return res.status(404).json({ code: 'not-found' })
      }
      res.json(article);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }

  Article.findById(req.params.id)
    .populate('user')
    .then((result) => {
      return res.json(result);
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }

  Article.find({ enabled: true})
    .sort({ created_at: -1 })
    .populate('user')
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }

  const title = req.body.title;
  const text = req.body.text;
  const userId = req.body.userId;

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
    .then(() => {
      res.status(201).json({ code: "okey" })
    })
    .catch(next);

});

router.get('/users/:id', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }

  Article.find({ user: req.params.id, enabled: true })
    .populate('user')
    .then((result) => {
      return res.json(result);
    })
    .catch(next);
});

module.exports = router;
