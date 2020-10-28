const boom = require('boom');
const usersRepo = require('./user.db.repository');
const User = require('./user.model');
const { newUser } = require('./user.schema');

const getAll = () => usersRepo.getAll();

const addUser = (name, login, password) => {
  const { error } = newUser.validate({ name, login, password });
  if (error) throw boom.badRequest(error.message, { request: 'addUser' });
  const user = new User({ name, login, password });
  return usersRepo.addUser(user);
};

const getById = async id => {
  const user = await usersRepo.getById(id);
  if (!user) {
    throw boom.notFound("This user doesn't exist", { request: 'getByIdUser' });
  }
  return user;
};

const updateUser = async (name, login, password, id) => {
  const { error } = newUser.validate({ name, login, password });
  if (error) throw boom.badRequest(error.message, { request: 'updateUser' });
  return usersRepo.update({ name, login, password, id });
};
const deleteById = id => usersRepo.deleteById(id);

module.exports = {
  getAll,
  addUser,
  getById,
  deleteById,
  updateUser
};
