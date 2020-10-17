const store = require('../store');

const getAll = async () => {
  return store.users;
};

const addUser = async user => {
  store.users.push(user);
  return user;
};

const checkForAlreadyExist = async login => {
  return !!store.users.filter(user => user.login === login).length;
};

const getById = async id => {
  return store.users.find(user => user.id === id);
};

const deleteById = async id => {
  store.users = store.users.filter(user => user.id !== id);
  store.tasks = store.tasks.map(task => {
    if (task.userId === id) {
      console.log('MATCH');
      task.userId = null;
    }
    return task;
  });
  return store.users;
};
module.exports = { getAll, addUser, checkForAlreadyExist, getById, deleteById };
