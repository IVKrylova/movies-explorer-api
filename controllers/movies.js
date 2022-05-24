const Movie = require('../models/movie');
const { checkRes } = require('../utils/utils');
const { BadRequestError } = require('../utils/BadRequestError');
const { NotFoundError } = require('../utils/NotFoundError');
const { ForbiddenError } = require('../utils/ForbiddenError');

// получаем все фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => {
      movie.reverse();
      res.send({ data: movie });
    })
    .catch(next);
};

// создаем фильм
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
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

// удаляем сохранённый фильм по id
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((data) => checkRes(data))
    .then((movie) => {
      if (req.user._id !== movie.owner.toString()) {
        throw new ForbiddenError('Попытка удалить чужую карточку');
      }
      return movie;
    })
    .then((movie) => Movie.findByIdAndRemove(movie._id.toString())
      .then((data) => res.send({ data })))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else if (err.statusCode === 404 || err.name === 'NotFoundError') {
        next(new NotFoundError('Карточка с указанным _id не найдена'));
      } else {
        next(err);
      }
    });
};
