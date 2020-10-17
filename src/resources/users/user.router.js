const router = require('express').Router();
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(user => user.toResponse()));
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;
  // const isAlreadyExist = await usersService.checkForAlreadyExist(login);
  // if (isAlreadyExist) {
  //   res.status(400).json('This login is already exist');
  // } else {
  const user = await usersService.addUser(name, login, password);
  res.json(user.toResponse());
  // }
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getById(req.params.id);
  if (user) {
    res.json(user.toResponse());
  } else {
    res.status(404).json("This user doesn't exist");
  }
});

router.route('/:id').put(async (req, res) => {
  const { name, login, password } = req.body;
  // const isAlreadyExist = await usersService.checkForAlreadyExist(login);
  // if (isAlreadyExist) {
  //   res.status(400).json('This login is already exist');
  // } else {
  const user = await usersService.getById(req.params.id);
  user.update(name, login, password);
  res.json(user.toResponse());
  // }
});

router.route('/:id').delete(async (req, res) => {
  const user = await usersService.getById(req.params.id);
  if (user) {
    await usersService.deleteById(req.params.id);
    res.status(204).end();
  } else {
    res.status(404).json("This user doesn't exist");
  }
});

module.exports = router;
