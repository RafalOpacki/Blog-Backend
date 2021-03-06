const mongoose = require('mongoose');
const postSchema = require('./Post').postSchema;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: {
    type: [postSchema],
    default: [],
  },
  authenticated: {
    type: Boolean,
    default: false,
  },
});

const userModel = mongoose.model('users', userSchema);

module.exports = { userModel, userSchema };
