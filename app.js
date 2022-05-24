require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

// подключаем логгер запросов
app.use(requestLogger);

// все роуты приложения
app.use(routes);

// подключаем логгер ошибок
app.use(errorLogger);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/moviesdb');

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${PORT}`);
  });
}

main();
