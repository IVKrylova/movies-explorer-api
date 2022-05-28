const validator = require('validator');
const { NotFoundError } = require('./NotFoundError');
const {
  BAD_REQUEST_MESSAGE,
  NOT_FOUND_MESSAGE,
} = require('./constants');

// проверка на поиск по некорректным данным
const checkRes = (res) => {
  if (res === null) {
    throw new NotFoundError(NOT_FOUND_MESSAGE);
  }
  return res;
};

// проверка корректности URL для celebrate
const checkUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message(BAD_REQUEST_MESSAGE);
};

module.exports = {
  checkRes,
  checkUrl,
};
