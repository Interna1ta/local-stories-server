'use strict';

const express = require('express');
const router = express.Router();

// const NodeGeocoder = require('node-geocoder');

// const options = {
//   provider: 'google',

//   // Optional depending on the providers
//   httpAdapter: 'https', // Default
//   apiKey: process.env.GOOGLE_API_KEY, // for Mapquest, OpenCage, Google Premier
//   formatter: null         // 'gpx', 'string', ...
// };

// const geocoder = NodeGeocoder(options);

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
  const coordinates = req.body.coordinates;

  if (!text) {
    return res.status(422).json({ code: 'unprocessable-entity' })
  }

  //lat and long of an exemple
  // geocoder.reverse({ lat: 41.401113699999996, lon: 2.1312309 })
  //   .then((res) => {
  //     // console.log(res);
  //     // city = res[0].city;
  //     console.log(res[0].city);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // console.log(text);
  // console.log(userId);
  // console.log(coordinates);
  // console.log(city);

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
