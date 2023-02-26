const Movie = require('../models/movie');
const constants = require('../utils/constants');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const BadRequestError = require('../errors/badRequestError');

module.exports.sendMovies = (req, res, next) => {
  const ownerId = req.user._id;

  Movie.find({ owner: ownerId })
    .populate('owner')
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
    .then((movie) => movie.populate('owner'))
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(constants.movie_create_bad_request));
      }

      return next(err);
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(constants.movie_not_found);
      }

      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(constants.movie_delete_no_access);
      }

      return movie.remove()
        .then(() => res.send({ message: constants.movie_delete_success }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(constants.movie_delete_bad_request));
      }
      return next(err);
    });
};
