const fs = require('fs');
const path = require('path');
const { HttpError, InternalServerError } = require('http-errors');
const { exit } = process;

const { colors } = require('../../common/constants');

const writeToLogsFile = async (dataToWrite, pathToFile) => {
  return new Promise((resolve, reject) => {
    fs.appendFile(
      pathToFile
        ? path.resolve(pathToFile)
        : path.resolve(__dirname, './logs.log'),
      `${JSON.stringify(dataToWrite)}\n`,
      {
        encoding: 'utf8',
        flag: 'a+'
      },
      err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

const logger = async (req, res, next) => {
  try {
    const { method, body, query, originalUrl } = req;
    const data = {
      date: new Date().toISOString(),
      method: method.toUpperCase(),
      url: originalUrl,
      query: Object.entries(query).length ? query : null,
      body: Object.entries(body).length ? body : null
    };

    await writeToLogsFile(data);
    next();
    return;
  } catch (error) {
    if (error) {
      console.error(`${colors.error}${error}${colors.normal}`);
      await writeToLogsFile(error);
      next();
      return;
    }
  }
};

const errorLogger = async (err, req) => {
  try {
    const { statusCode, message } = err;
    const data = {
      date: new Date().toISOString(),
      statusCode,
      errorMessage: message
    };
    if (req && req.method) {
      data.method = req.method.toUpperCase();
    }
    if (req && req.url) {
      data.url = req.originalUrl;
    }
    if (req && req.query && Object.entries(req.query).length) {
      data.req = req.query;
    }
    if (req && req.body && Object.entries(req.body).length) {
      data.body = req.body;
    }
    console.error(`${colors.error}ERROR: ${message}${colors.normal}`);

    await writeToLogsFile(data, path.resolve(__dirname, './error.log'));
    return;
  } catch (error) {
    if (error) {
      console.error(`${colors.error}${error}${colors.normal}`);
      await writeToLogsFile(error);
      return;
    }
  }
};

const errorHandler = (err, req, res, next) => {
  if (err && err instanceof HttpError) {
    res.status(err.statusCode).send(err.message);
  } else {
    errorLogger(err, req, res, next);
    err = new InternalServerError();
    res.status(err.statusCode).send(err.message);
  }
};

const promiseRejectHandler = err => {
  errorLogger(err);
};

const uncaughtExceptionHandler = err => {
  errorLogger(err).then(() => exit(1));
};

module.exports = {
  logger,
  errorHandler,
  promiseRejectHandler,
  uncaughtExceptionHandler
};
