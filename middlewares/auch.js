const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/UnauthorizedError');
const {
  UNAUTHORIZED_MESSAGE,
  DEV_SECRET,
} = require('../utils/constants');

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(UNAUTHORIZED_MESSAGE);
  }

  // извлечём токен
  const token = authorization.replace('Bearer ', '');

  // верифицируем токен
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET);
  } catch (err) {
    throw new UnauthorizedError(UNAUTHORIZED_MESSAGE);
  }

  // записываем пейлоуд в объект запроса
  req.user = payload;

  next();
};
