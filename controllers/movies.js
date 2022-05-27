const Movie = require('../models/movie');
const { checkRes } = require('../utils/utils');
const { BadRequestError } = require('../utils/BadRequestError');
const { NotFoundError } = require('../utils/NotFoundError');
const { ForbiddenError } = require('../utils/ForbiddenError');
const {
  BAD_REQUEST_MESSAGE,
  FORBIDDEN_MESSAGE,
  NOT_FOUND_MESSAGE,
} = require('../utils/constants');

// получаем все фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => {
      res.send({ data: movie });
    })
    .catch(next);
};

// создаем сохраненный фильм в нашей БД
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      } else {
        next(err);
      }
    });
};

// удаляем сохранённый фильм по id
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((data) => checkRes(data))
    .then((movie) => {
      if (req.user._id !== movie.owner.toString()) {
        throw new ForbiddenError(FORBIDDEN_MESSAGE);
      }
      return movie;
    })
    .then((movie) => Movie.findByIdAndRemove(movie._id.toString())
      .then((data) => res.send({ data })))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      } else if (err.name === 'NotFoundError') {
        next(new NotFoundError(NOT_FOUND_MESSAGE));
      } else {
        next(err);
      }
    });
};
