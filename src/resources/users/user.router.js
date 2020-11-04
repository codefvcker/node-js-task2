const router = require('express').Router();
const { toResponse } = require('./user.model');
const usersService = require('./user.service');
const validator = require('../../utils/validation/validator');
const { userSchema, idSchema } = require('../../utils/validation/schemas');

const getAllHandler = async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.status(200).send(users.map(toResponse));
  } catch (error) {
    return next(error);
  }
};

const getByIdHandler = async (req, res, next) => {
  try {
    const user = await usersService.getById(req.params.id);
    res.status(200).send(toResponse(user));
  } catch (error) {
    return next(error);
  }
};

const createHandler = async (req, res, next) => {
  try {
    const user = await usersService.createUser(req.body);
    res.status(200).send(toResponse(user));
  } catch (error) {
    return next(error);
  }
};

const updateHandler = async (req, res, next) => {
  try {
    const user = await usersService.updateUser(req.params.id, req.body);
    res.status(200).send(toResponse(user));
  } catch (error) {
    return next(error);
  }
};

const deleteHandler = async (req, res, next) => {
  try {
    const user = await usersService.deleteUser(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    return next(error);
  }
};

router.route('/').get(getAllHandler);
router.route('/:id').get(validator(idSchema, 'params'), getByIdHandler);
router.route('/').post(validator(userSchema, 'body'), createHandler);
router
  .route('/:id')
  .put(
    validator(idSchema, 'params'),
    validator(userSchema, 'body'),
    updateHandler
  );
router.route('/:id').delete(validator(idSchema, 'params'), deleteHandler);

module.exports = router;
