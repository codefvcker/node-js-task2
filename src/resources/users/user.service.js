const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

const getAll = () => usersRepo.getAll();

const addUser = (name, login, password) => {
  const user = new User({ name, login, password });
  return usersRepo.addUser(user);
};

const checkForAlreadyExist = login => usersRepo.checkForAlreadyExist(login);

const getById = id => usersRepo.getById(id);

const deleteById = id => usersRepo.deleteById(id);

module.exports = { getAll, addUser, checkForAlreadyExist, getById, deleteById };
