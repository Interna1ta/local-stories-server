'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = mongoose.Types.objectId;

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
    // type: [objectId],
    type: Object,
    ref: 'User'
  },
  coordinates: {
    type: Object
  },
  enabled: {
    type: Boolean
  }
});

module.exports = mongoose.model('StoryEntry', StorySchema);
