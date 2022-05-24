const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auch');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');

// роут для авторизации пользователя
router.post('/signin', login);
// роут для регистрации пользователя
router.post('/signup', createUser);

// авторизация
router.use(auth);

// основные роуты приложения
router.use(usersRoutes);
router.use(moviesRoutes);

module.exports = router;
