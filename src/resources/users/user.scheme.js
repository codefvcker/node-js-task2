const Joi = require('joi');

const postUser = Joi.object({
  name: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().required()
});

const putUser = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().required()
});

module.exports = {
  postUser,
  putUser
};
