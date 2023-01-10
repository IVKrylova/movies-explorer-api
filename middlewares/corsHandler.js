// домены, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'http://ivkrylova-movies.fun',
  'https://ivkrylova-movies.fun',
  'http://localhost:3000',
  'https://localhost:3000',
];
const { DEFAULT_ALLOWED_METHODS } = require('../utils/constants');

const corsHandler = (req, res, next) => {
  // сохраняем источник запроса в переменную origin
  const { origin } = req.headers;
  // проверяем, что источник запроса есть среди разрешённых

  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
    // запрос на получение данных авторизации с другого домена
    res.header('Access-Control-Allow-Credentials', true);
  }

  // сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const { method } = req;
  // сохраняем список заголовков исходного запроса
  const requestHeaders = req.headers['access-control-request-headers'];

  // если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с заголовками исходного запроса
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // запрос на получение данных авторизации с другого домена
    res.header('Access-Control-Allow-Credentials', true);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }

  return next();
};

module.exports = corsHandler;
