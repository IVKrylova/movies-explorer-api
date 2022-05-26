const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  postMoviesValidation,
  deleteMovieValidation,
} = require('../utils/celebrateValidation');

// возвращает все сохранённые текущим  пользователем фильмы
router.get('/movies', getMovies);

// создаёт фильм
router.post('/movies', celebrate(postMoviesValidation), createMovie);

// удаляет сохранённый фильм по id
router.delete('/movies/:_id', celebrate(deleteMovieValidation), deleteMovie);

module.exports = router;
