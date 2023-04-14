const router = require('express').Router();
const { validateMovieAdd, validateMovieDelete } = require('../middlewares/reqValidation');

const {
  sendMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

// возвращает все фильмы
router.get('/', sendMovies);

// создаёт фильм
router.post('/', validateMovieAdd, createMovie);

// удаляет фильм по идентификатору
router.delete('/:id', validateMovieDelete, deleteMovieById);

module.exports = router;
