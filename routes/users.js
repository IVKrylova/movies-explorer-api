const router = require('express').Router();
const {
  getUser,
  updateProfile,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/users/me', getUser);
// обновляет информацию о пользователе (email и имя)
router.patch('/users/me', updateProfile);
