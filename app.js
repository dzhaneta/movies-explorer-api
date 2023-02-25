require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/', router);

app.listen(PORT);
