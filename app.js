const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const errHandler = require('./middlewares/errHandler');
const cors = require('./middlewares/cors');
const rateLimiter = require('./middlewares/reqLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const config = require('./config');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;

mongoose.connect(config.db_uri);

const app = express();

// логгер запросов
app.use(requestLogger);
app.use(rateLimiter);

app.use(express.json());
app.use(cookieParser());

// безопасность кросс-доменных запросов и заголовков
app.use(cors);
app.use(helmet());

app.use('/', router);

// логгер ошибок
app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());

// централизованный обработчик ошибок
app.use(errHandler);

app.listen(PORT);
