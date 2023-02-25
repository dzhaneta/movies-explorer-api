const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  sendMovies, createMovie, deleteMovieById,
} = require('../controllers/movies');
const RegExp = require('../utils/RegExp');

// возвращает все фильмы
router.get('/', sendMovies);

// создаёт фильм
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(RegExp),
    trailerLink: Joi.string().required().pattern(RegExp),
    thumbnail: Joi.string().required().pattern(RegExp),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

// удаляет фильм по идентификатору
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
}), deleteMovieById);

module.exports = router;
