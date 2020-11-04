const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const idSchema = Joi.object()
  .options({ abortEarly: false, allowUnknown: true })
  .keys({
    id: Joi.objectId(),
    boardId: Joi.objectId(),
    taskId: Joi.objectId()
  });

const userSchema = Joi.object()
  .options({ abortEarly: false, allowUnknown: true })
  .keys({
    name: Joi.string().max(30),
    login: Joi.string().max(30),
    password: Joi.string().min(4)
  });

const boardSchema = Joi.object()
  .options({ abortEarly: false, allowUnknown: true })
  .keys({
    id: Joi.string(),
    title: Joi.string(),
    columns: Joi.array().items(
      Joi.alternatives().try(
        Joi.object().keys({
          id: Joi.string(),
          title: Joi.string(),
          order: Joi.number()
        }),
        null
      )
    )
  });

const taskSchema = Joi.object()
  .options({ abortEarly: false, allowUnknown: true })
  .keys({
    id: Joi.string(),
    title: Joi.string(),
    order: Joi.number(),
    description: Joi.string(),
    userId: Joi.alternatives().try(Joi.string(), null),
    boardId: Joi.alternatives().try(Joi.string(), null),
    columnId: Joi.alternatives().try(Joi.string(), null)
  });

module.exports = {
  idSchema,
  userSchema,
  boardSchema,
  taskSchema
};
