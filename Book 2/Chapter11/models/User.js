const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Mongoose hook AFTER schema declaration
UserSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, encrypted) => {
    user.password = encrypted;
    next();
  });
});

module.exports = mongoose.model('User', UserSchema);
