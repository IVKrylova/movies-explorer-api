const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// возвращает все сохранённые текущим  пользователем фильмы
router.get('/movies', getMovies);
// создаёт фильм
router.post('/movies', createMovie);
// удаляет сохранённый фильм по id
router.delete('/movies/_id', deleteMovie);
