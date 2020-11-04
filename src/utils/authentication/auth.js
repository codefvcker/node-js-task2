const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const { Unauthorized, Forbidden } = require('http-errors');
const { User } = require('../../resources/users/user.model');

const authorize = async (req, res, next) => {
  try {
    if (!req.header('Authorization')) {
      throw new Unauthorized('Authorization header must be provided.');
    }
    const token = req.header('Authorization').replace('Bearer ', '');
    if (token) {
      const decodedUser = jwt.verify(token, JWT_SECRET_KEY);
      const dbUser = await User.findOne({ _id: decodedUser.userId });
      if (!dbUser) {
        throw new Forbidden('User not found.');
      }
      return next();
    }
    throw new Unauthorized('Authorization token must not be empty.');
  } catch (error) {
    return next(error);
  }
};

const generateToken = (login, userId) => {
  const payload = {
    login,
    userId
  };
  return jwt.sign(payload, JWT_SECRET_KEY);
};

module.exports = {
  authorize,
  generateToken
};
