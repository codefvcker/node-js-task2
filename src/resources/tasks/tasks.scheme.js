const Joi = require('joi');

const postTask = Joi.object({
  title: Joi.string().required(),
  order: Joi.number().required(),
  description: Joi.string().required(),
  userId: Joi.string().required(),
  boardId: Joi.string().required(),
  columnId: Joi.string().required()
});

const putTask = Joi.object({
  title: Joi.string().required(),
  order: Joi.number().required(),
  description: Joi.string().required(),
  userId: Joi.string().required(),
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  taskId: Joi.string().required()
});

module.exports = {
  postTask,
  putTask
};
