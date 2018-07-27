'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const StorySchema = new Schema({
  created_at: {
    type: Date,
    default: Date.now
  },
  text: {
    type: String,
    required: [true, "text is required"]
  },
  user: {
    type: objectId,
    ref: 'User'
  },
  coordinates: {
    type: Object
  },
  coordinates: {
    type: Object
  },
  text: {
    type: String,
    // required: [true, "text is required"]
  },
  enabled: {
    type: Boolean
  }
});

module.exports = mongoose.model('Story', StorySchema);
