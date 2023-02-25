const router = require('express').Router();
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const cors = require('../middlewares/cors');
const { validateSignup, validateSignin } = require('../middlewares/reqValidation');
const auth = require('../middlewares/auth');
const { login, createUser, logout } = require('../controllers/users');
const NotFoundError = require('../errors/notFoundError');
const errHandler = require('../middlewares/errHandler');

// логгер запросов
router.use(requestLogger);

// проверка кросс-доменных запросов
router.use(cors);

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// роуты, не требующие авторизации
router.post('/signup', validateSignup, createUser);
router.post('/signin', validateSignin, login);

// авторизация
router.use(auth);

// роуты, которым авторизация нужна
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.post('/signout', logout);

router.use((req, res, next) => {
  next(new NotFoundError('Такой страницы не существует.'));
});

// логгер ошибок
router.use(errorLogger);

// обработчик ошибок celebrate
router.use(errors());

// централизованный обработчик ошибок
router.use(errHandler);

module.exports = router;
