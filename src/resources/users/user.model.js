const uuid = require('uuid');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  login: String,
  password: String,
  _id: {
    type: String,
    default: uuid
  }
});

userSchema.statics.toResponse = obj => {
  const { id, name, login } = obj;
  return { id, name, login };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
