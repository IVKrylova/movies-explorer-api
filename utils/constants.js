// переменные для разработки, аналогичные переменным окружения process.env
const MONGODB_URL_DEV = 'mongodb://localhost:27017/moviesdb';
const DEV_SECRET = 'dev-secret';

// сообщения ошибок
const BAD_REQUEST_MESSAGE = 'Переданы некорректные данные';
const FORBIDDEN_MESSAGE = 'Попытка удалить фильм, сохраненный другим пользователем';
const NOT_FOUND_MESSAGE = 'Объект с указанным _id не найден';
const CONFLICT_MESSAGE = 'Указанный email уже зарегистрирован';
const UNAUTHORIZED_MESSAGE = 'Необходима авторизация';
const INTERNAL_ERROR_MESSAGE = 'Внутренняя ошибка сервера';
const LOGIN_ERROR_MESSAGE = 'Неправильные почта или пароль';
const WRONG_PATH_MESSAGE = 'Страница не найдена';

// значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  MONGODB_URL_DEV,
  DEV_SECRET,
  BAD_REQUEST_MESSAGE,
  FORBIDDEN_MESSAGE,
  NOT_FOUND_MESSAGE,
  CONFLICT_MESSAGE,
  UNAUTHORIZED_MESSAGE,
  INTERNAL_ERROR_MESSAGE,
  LOGIN_ERROR_MESSAGE,
  WRONG_PATH_MESSAGE,
  DEFAULT_ALLOWED_METHODS,
};
