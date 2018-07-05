'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const notificationSchema = new Schema({
  user: {
    type: objectId,
    ref: 'User'
  },
  created_by: {
    type: objectId,
    ref: 'User'
  },
  message: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Notification", notificationSchema);