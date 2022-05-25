const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser,
  updateProfile,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/users/me', getUser);

// обновляет информацию о пользователе (email и имя)
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
}), updateProfile);

module.exports = router;
