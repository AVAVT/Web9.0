const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersModel = new Schema({
  username: { type: String, require: true, unique: true},
  password: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  userAvatar: { type: String },
  title: { type: String }
});

module.exports = mongoose.model('users', usersModel);
