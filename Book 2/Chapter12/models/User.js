const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var uniqueValidator = require('mongoose-unique-validator');

const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true,'Enter Username'],
    unique: true
  },
  password: {
    type: String,
    required: [true,'Enter Password'],
  }
});

UserSchema.plugin(uniqueValidator);

// Mongoose hook AFTER schema declaration
UserSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, encrypted) => {
    user.password = encrypted;
    next();
  });
});

module.exports = mongoose.model('User', UserSchema);
