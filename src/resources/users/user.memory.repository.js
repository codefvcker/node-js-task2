let { users } = require('../store');

const getAll = async () => {
  return users;
};

const addUser = async (user) => {
  users.push(user);
  return user;
};

const checkForAlreadyExist = async (login) => {
  return !!users.filter((user) => user.login === login).length;
};

const getById = async (id) => {
  return users.find((user) => user.id === id);
};

const deleteById = async (id) => {
  users = users.filter((user) => user.id !== id);
  return users;
};
module.exports = { getAll, addUser, checkForAlreadyExist, getById, deleteById };
