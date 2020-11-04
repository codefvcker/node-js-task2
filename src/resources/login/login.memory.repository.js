const { User } = require('../users/user.model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../../utils/authentication/auth');
const { NotFound, BadRequest } = require('http-errors');

const login = async (userLogin, password) => {
  const user = await User.findOne({ login: userLogin });
  if (!user) {
    throw new NotFound('User does not exist!');
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new BadRequest('Wrong password.');
  }

  const token = await generateToken(userLogin, user._id);

  return {
    token
  };
};

module.exports = {
  login
};
