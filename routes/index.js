const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auch');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');

// роут для авторизации пользователя
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

// роут для регистрации пользователя
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), createUser);

// авторизация
router.use(auth);

// основные роуты приложения
router.use(usersRoutes);
router.use(moviesRoutes);

module.exports = router;
