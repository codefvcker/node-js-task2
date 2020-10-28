const Joi = require('joi');

const task = Joi.object({
  title: Joi.string().required(),
  order: Joi.number()
    .integer()
    .min(0)
    .required(),
  description: Joi.string().required(),
  userId: Joi.string()
    .allow(null)
    .required(),
  boardId: Joi.string()
    .allow(null)
    .required(),
  columnId: Joi.string().allow(null)
});

module.exports = task;
