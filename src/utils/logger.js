const { createLogger, transports, format } = require('winston');
const appRoot = require('app-root-path');

const options = {
  fileInfo: {
    level: 'info',
    filename: `${appRoot}/logs/info.log`,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: format.combine(format.timestamp(), format.prettyPrint())
  },
  fileError: {
    level: 'error',
    filename: `${appRoot}/logs/error.log`,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: format.combine(format.timestamp(), format.prettyPrint())
  },
  console: {
    level: 'debug',
    json: false,
    colorize: true,
    format: format.combine(format.timestamp(), format.prettyPrint())
  }
};

const logger = createLogger({
  transports: [
    new transports.Console(options.console),
    new transports.File(options.fileInfo),
    new transports.File(options.fileError)
  ],
  exceptionHandlers: [
    new transports.Console(options.console),
    new transports.File(options.fileError)
  ],
  rejectionHandlers: [
    new transports.Console(options.console),
    new transports.File(options.fileError)
  ],
  exitOnError: false
});

logger.stream = {
  write(message) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  }
};

module.exports = logger;
