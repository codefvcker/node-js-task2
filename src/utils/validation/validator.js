const { BadRequest, UnprocessableEntity } = require('http-errors');

const validator = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      res
        .status(property === 'body' ? UnprocessableEntity : BadRequest)
        .send(error);
    } else {
      return next();
    }
  };
};

module.exports = validator;
