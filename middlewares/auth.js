const jwt = require('jsonwebtoken');
const config = require('../config');
const constants = require('../utils/constants');
const UnauthorizedError = require('../errors/unauthorizedError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  // проверяем, есть ли токен в куках
  if (!token) {
    return next(new UnauthorizedError(constants.auth_no_token));
  }

  let payload;

  try {
    // верифицируем токен
    payload = jwt.verify(token, config.jwt_secret);
  } catch (err) {
    return next(new UnauthorizedError(constants.auth_bad_token));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
