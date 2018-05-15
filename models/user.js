'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
  username: { // screen_name
    type: String,
    required: [true, "username is required"]
  }, 
  password: {
    type: String,
    required: [true, "password is required"]
  }, 
  name: {
    type: String,
    // required: [true, "name is required"]
  }, 
  location: { // backlog: google places
    type: String
  },
  description: {
    type: String
  },
  following: [{ 
    type: objectId, 
    ref: 'User' 
  }],
  created_at: {
    type: Date,
    default: Date.now
  },
  profile_image_url: {
    type: String,
    default: 'https://thenounproject.com/term/avatar/72032/'
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;