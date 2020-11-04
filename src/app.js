const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardsRouter = require('./resources/boards/board.router');
const loginRouter = require('./resources/login/login.router');
const { logger, errorHandler } = require('./utils/logger/logger');
const {
  promiseRejectHandler,
  uncaughtExceptionHandler
} = require('./utils/logger/logger');
const { authorize } = require('./utils/authentication/auth');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

process
  .on('unhandledRejection', promiseRejectHandler)
  .on('uncaughtException', uncaughtExceptionHandler);

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(logger);
app.use('/users', authorize, userRouter);
app.use('/boards', authorize, boardsRouter);
app.use('/login', loginRouter);
app.use(errorHandler);

// throw Error('throw Error!');
// Promise.reject(Error('Promise.reject!'));

module.exports = app;
