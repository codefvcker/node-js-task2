const { createLogger, format, transports } = require('winston');

const logHandlerFormat = format.printf(({ level, message, label, tmsp }) => {
  return `${tmsp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: format.combine(
    format.label({ label: 'status' }),
    format.timestamp(),
    logHandlerFormat
  ),
  transports: [new transports.Console()],
  exceptionHandlers: [new transports.Console()],
  rejectionHandlers: [new transports.Console()],
  exitOnError: false
});

const loggerHandler = (err, req) => {
  const logBody = {
    url: req.originalUrl,
    params: req.query,
    body: req.body
  };
  logger.info(JSON.stringify(logBody));
  if (err.message) {
    const errMessage = `${err.output.payload.statusCode} - ${err.output.payload.error}. Message: ${err.message}`;
    logger.log('error', errMessage);
  }
};

module.exports = loggerHandler;
