const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const { checkRes } = require('../utils/utils');
const { BadRequestError } = require('../utils/BadRequestError');
const { NotFoundError } = require('../utils/NotFoundError');
const { ConflictError } = require('../utils/ConflictError');

// получаем пользователя по id
module.exports.getUser = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((data) => checkRes(data))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } if (err.statusCode === 404 || err.name === 'NotFoundError') {
        next(new NotFoundError('Пользователь по указанному _id не найден'));
      } else {
        next(err);
      }
    });
};

// обновляем профиль
module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((data) => checkRes(data))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      } else if (err.statusCode === 404 || err.name === 'NotFoundError') {
        next(new NotFoundError('Пользователь с указанным _id не найден'));
      } else {
        next(err);
      }
    });
};

// создаем нового пользователя
module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('При регистрации указан email, который уже существует на сервере');
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => res.send({
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err.statusCode === 404 || err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else {
        next(err);
      }
    });
};

// вход в приложение
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};
