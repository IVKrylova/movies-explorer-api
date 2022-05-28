const rateLimit = require('express-rate-limit');

// Лимит 100 запросов за 10 минут с одного IP
const limiter = rateLimit({
  // 10 минут
  windowMs: 10 * 60 * 1000,
  // 100 запросов
  max: 100,
});

module.exports = limiter;
