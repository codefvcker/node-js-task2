const router = require('express').Router();
const usersService = require('./user.service');

const { postUser, putUser } = require('./user.scheme');
const boom = require('@hapi/boom');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(user => user.toResponse()));
});

router.route('/').post(async (req, res, next) => {
  const { name, login, password } = req.body;
  const { error } = postUser.validate({ name, login, password });
  if (error) {
    return next(boom.badRequest(error));
  }
  const user = await usersService.addUser(name, login, password);
  res.json(user.toResponse());
  return next(req);
});

router.route('/:id').get(async (req, res, next) => {
  const user = await usersService.getById(req.params.id);
  try {
    res.json(user.toResponse());
  } catch (err) {
    return next(boom.notFound(err));
  }
});

router.route('/:id').put(async (req, res, next) => {
  const { name, login, password } = req.body;
  const user = await usersService.getById(req.params.id);
  const id = req.params.id;
  const { error } = putUser.validate({ id, name, login, password });

  if (!error) {
    try {
      user.update(name, login, password);
      res.json(user.toResponse());
    } catch (err) {
      return next(boom.notFound(err));
    }
  } else {
    return next(boom.badRequest(error));
  }
});

router.route('/:id').delete(async (req, res, next) => {
  const user = await usersService.getById(req.params.id);
  if (user) {
    await usersService.deleteById(req.params.id);
    res.status(204).end();
  } else {
    return next(boom.notFound('This user doesnt exist'));
  }
});

module.exports = router;
