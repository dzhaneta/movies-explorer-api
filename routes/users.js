const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  updateUserInfo,
  sendUserInfo,
} = require('../controllers/users');

// возвращает информацию о пользователе
router.get('/me', sendUserInfo);

// обновляет профиль
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUserInfo);

module.exports = router;
