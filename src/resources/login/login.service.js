const loginRepo = require('./login.memory.repository');

const logIn = (login, password) => loginRepo.login(login, password);

module.exports = {
  login: logIn
};
