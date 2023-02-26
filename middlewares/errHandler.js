const constants = require('../utils/constants');

module.exports = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: `${constants.http_internal_server_error}: ${err.message}` });
  }
  next();
};
