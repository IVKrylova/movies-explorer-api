const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUser,
  updateProfile,
} = require('../controllers/users');
const { updateProfileValidation } = require('../utils/celebrateValidation');

// возвращает информацию о пользователе (email и имя)
router.get('/users/me', getUser);

// обновляет информацию о пользователе (email и имя)
router.patch('/users/me', celebrate(updateProfileValidation), updateProfile);

module.exports = router;
