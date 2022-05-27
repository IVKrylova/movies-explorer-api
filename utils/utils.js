const { NotFoundError } = require('./NotFoundError');
const { NOT_FOUND_MESSAGE } = require('./constants');

// проверка на поиск по некорректным данным
const checkRes = (res) => {
  if (res === null) {
    throw new NotFoundError(NOT_FOUND_MESSAGE);
  }
  return res;
};

module.exports = { checkRes };
