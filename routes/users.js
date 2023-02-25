const router = require('express').Router();
const { validateUserUpdate } = require('../middlewares/reqValidation');

const {
  updateUserInfo,
  sendUserInfo,
} = require('../controllers/users');

// возвращает информацию о пользователе
router.get('/me', sendUserInfo);

// обновляет профиль
router.patch('/me', validateUserUpdate, updateUserInfo);

module.exports = router;
