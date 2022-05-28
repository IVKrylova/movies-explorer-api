const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  login,
  createUser,
} = require('../controllers/users');
const auth = require('../middlewares/auch');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const { NotFoundError } = require('../utils/NotFoundError');
const {
  createUserValidation,
  loginValidation,
} = require('../utils/celebrateValidation');
const { WRONG_PATH_MESSAGE } = require('../utils/constants');

// роут для регистрации пользователя
router.post('/signup', celebrate(createUserValidation), createUser);

// роут для авторизации пользователя
router.post('/signin', celebrate(loginValidation), login);

// авторизация
router.use(auth);

// основные роуты приложения
router.use(usersRoutes);
router.use(moviesRoutes);

// oбработка неправильного пути
router.use((req, res, next) => {
  next(new NotFoundError(WRONG_PATH_MESSAGE));
});

module.exports = router;
