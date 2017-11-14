const bcrypt = require('bcrypt');
const usersModel = require('../models/usersModel');

const createUser = (user, callback) => {
  bcrypt.hash(user.password, 10, (err, hash) => {
    let newUser = {
      username : user.username,
      password : hash,
      email : user.email,
      userAvatar : user.userAvatar,
      title : user.title
    };
    usersModel.create(newUser, (err, data) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null, data);
      }
    })
  });
}

const getUserById = (id, callback) => {
  usersModel.findOne({ _id : id }).select("username email title").exec((err, doc) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, doc);
    }
  });
}

const updateUser = (user) => {

}

const deleteUserById = (id) => {

}

module.exports = {
  createUser,
  getUserById,
}
