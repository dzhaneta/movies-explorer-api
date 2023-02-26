const { DOMAIN = 'localhost' } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const constants = require('../utils/constants');
const User = require('../models/user');
const BadRequestError = require('../errors/badRequestError');
const ConflictError = require('../errors/conflictError');
const NotFoundError = require('../errors/notFoundError');

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(constants.user_create_bad_request));
      }
      if (err.code === 11000) {
        return next(new ConflictError(constants.user_email_exist));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна! создадим токен
      const token = jwt.sign(
        { _id: user._id },
        config.jwt_secret,
        { expiresIn: '7d' },
      );

      // вернём токен, записав его в httpOnly куку
      res
        .cookie('jwt', token, {
          // token - наш JWT токен, который мы отправляем
          domain: DOMAIN,
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        })
        .send({ data: user });
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res
    .clearCookie('jwt', {
      domain: DOMAIN,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    })
    .send({ message: constants.user_logout_success });
};

module.exports.sendUserInfo = (req, res, next) => {
  const ownerId = req.user._id;

  User.findById(ownerId)
    .then((userInfo) => {
      if (!userInfo) {
        return next(new NotFoundError(constants.user_not_found));
      }
      return res.send({
        name: userInfo.name,
        email: userInfo.email,
      });
    })
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  const ownerId = req.user._id;

  User.findByIdAndUpdate(
    ownerId,
    { name, email },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(constants.user_not_found));
      }

      return res.send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(constants.user_update_bad_request));
      }

      if (err.code === 11000) {
        return next(new ConflictError(constants.user_email_exist));
      }

      return next(err);
    });
};
