require('dotenv').config();

const production = process.env.NODE_ENV === 'production' ? 'yes' : null;

const config = {};

config.db_uri = production ? process.env.MONGODB_URI : 'mongodb://127.0.0.1:27017/bitfilmsdb';
config.jwt_secret = production ? process.env.JWT_SECRET : 'dev-secret';

module.exports = config;
