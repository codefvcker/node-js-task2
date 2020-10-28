const Joi = require('joi');

const newUser = Joi.object({
  name: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().required()
});

module.exports.newUser = newUser;
