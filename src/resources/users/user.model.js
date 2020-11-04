const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'USER',
      required: false
    },
    login: {
      type: String,
      default: 'user-login',
      unique: true,
      required: false
    },
    password: {
      type: String,
      required: false
    }
  },
  {
    versionKey: false,
    collection: 'users'
  }
);

const toResponse = user => {
  const { _id, name, login } = user;
  return { id: _id, name, login };
};

module.exports = {
  User: mongoose.model('User', userSchema),
  toResponse
};
