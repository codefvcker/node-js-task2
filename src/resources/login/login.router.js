const router = require('express').Router();
const loginService = require('./login.service');

const loginHandler = async (req, res, next) => {
  try {
    const result = await loginService.login(req.body.login, req.body.password);
    res.status(200).send(result);
  } catch (error) {
    return next(error);
  }
};

router.route('/').post(loginHandler);

module.exports = router;
