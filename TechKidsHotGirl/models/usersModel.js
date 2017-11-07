const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersModel = new Schema({
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userAvatar: { type: String },
  title: { type: String }
});

module.exports = mongoose.model('users', usersModel);
