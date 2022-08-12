# Бэкенд проекта Movies
**Дипломная работа для Яндекс.Практикум** <br>

## Описание
Проект - API для аутентификации пользователей и сохранения фильмов в сервиесе Movies.

## Используемые технологии
1. Express.js
2. MongoDB
3. REST API

## Инструменты
1. MongoDB Compass
2. Postman

## Схемы и модели
1. Коллекция пользователей. Поля её схемы:
* email - почта пользователя, обязательное поле, уникальное для каждого пользователя.
* password - хеш пароля, обязательное поле-строка.
* name - имя пользователя, обязательное поле-строка от 2 до 30 символов.
2. Коллекция сохранённых фильмов. Поля её схемы:
* country - страна создания фильма, обязательное поле-строка.
* director - режиссёр фильма, обязательное поле-строка.
* duration - длительность фильма, обязательное поле-число.
* year - год выпуска фильма, обязательное поле-строка.
* description - описание фильма, обязательное поле-строка.
* image - ссылка на постер к фильму, обязательное поле-строка.
* trailerLink - ссылка на трейлер фильма, обязательное поле-строка.
* thumbnail - миниатюрное изображение постера к фильму, обязательное поле-строка.
* owner - _id пользователя, который сохранил фильм, обязательное поле.
* movieId - id фильма, который содержится в ответе сервиса с фильмами, обязательное поле. 
* nameRU - название фильма на русском языке, обязательное поле-строка.
* nameEN - название фильма на английском языке, обязательное поле-строка.
  
## Роуты
* GET `/users/me` - возвращает email и имя пользователя. 
* PATCH `/users/me` - обновляет email и имя пользователя.
* GET `/movies` - возвращает все сохранённые текущим  пользователем фильмы.
* POST `/movies` - создаёт фильм.
* DELETE `/movies/_id` - удаляет сохранённый фильм по id.
* POST `/signup` - создаёт пользователя.
* POST `/signin` - проверяет переданные в теле почту и пароль и возвращает JWT.

## Ошибки и безопасность
* Реализована централизованная обработка ошибок, созданы конструкторы 400, 401, 403, 404 и 409 ошибок.
* Для защиты приложения от веб-уязвимостей путем соответствующей настройки заголовков HTTP используется npm helmet.
* Установлен лимит запросов в 100 запросов за 10 минут с одного IP с помощью npm limiter.
* Приходящие на сервер запросы валидируются с помощью Joi и celebrate.
* Данные валидируются на уровне схемы.
* Настроены кросс-доменные запросы (CORS).
* Ключи хранятся в файле .env
  
## Запуск проекта
`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

## Демо
К серверу можно обратиться по адресу: https://api.movies.ivkrylova.nomoredomains.xyz<br>
Репозиторий с фронтендом можно посмотреть [здесь](https://github.com/IVKrylova/movies-explorer-frontend).<br>
Готовый проект Movies можно посмотреть [здесь](https://movies.ivkrylova.nomoredomains.xyz/).
