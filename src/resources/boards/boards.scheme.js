const Joi = require('joi');

const postBoard = Joi.object({
  title: Joi.string().required(),
  columns: Joi.array()
    .items(Joi.object())
    .required()
});

const putBoard = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  columns: Joi.array()
    .items(Joi.object())
    .required()
});

module.exports = {
  postBoard,
  putBoard
};
