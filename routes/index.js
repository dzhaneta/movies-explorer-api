const router = require('express').Router();
const constants = require('../utils/constants');
const { validateSignup, validateSignin } = require('../middlewares/reqValidation');
const auth = require('../middlewares/auth');
const { login, createUser, logout } = require('../controllers/users');
const NotFoundError = require('../errors/notFoundError');

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
  next(new NotFoundError(constants.http_not_found));
});

module.exports = router;
