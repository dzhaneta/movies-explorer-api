const Movie = require('../models/movie');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const BadRequestError = require('../errors/badRequestError');

module.exports.sendMovies = (req, res, next) => {
  Movie.find({})
    .populate(['owner', 'likes'])
    .sort({ createdAt: -1 })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const ownerId = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: ownerId,
  })
    .then((movie) => movie.populate(['owner', 'likes']))
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(
          'Переданы некорректные данные при создании фильма.',
        ));
      }

      return next(err);
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным _id не найдена.');
      }

      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нельзя удалить фильм другого пользователя.');
      }

      return movie.remove()
        .then(() => res.send({ message: 'Фильм удален' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные при удалении фильма.'));
      }
      return next(err);
    });
};
