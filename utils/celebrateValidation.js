const { Joi } = require('celebrate');
const { checkUrl } = require('./utils');

const postMoviesValidation = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(checkUrl),
    trailerLink: Joi.string().required().custom(checkUrl),
    thumbnail: Joi.string().required().custom(checkUrl),
    movieId: Joi.number().integer().positive().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
};

const deleteMovieValidation = {
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
};

const createUserValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
};

const loginValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const updateProfileValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
};

module.exports = {
  updateProfileValidation,
  loginValidation,
  createUserValidation,
  deleteMovieValidation,
  postMoviesValidation,
};
