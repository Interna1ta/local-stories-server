'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const ArticleSchema = new Schema({
  created_at: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: [true, "title is required"]
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
  enabled: {
    type: Boolean
  }
});

module.exports = mongoose.model('Article', ArticleSchema);
