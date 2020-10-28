const Joi = require('joi');

const newBoard = Joi.object({
  title: Joi.string().required(),
  columns: Joi.array()
    .items(Joi.object())
    .required()
});

module.exports = { newBoard };
