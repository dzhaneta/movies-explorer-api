require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');

const { PORT = 3000, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI);

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/', router);

app.listen(PORT);
