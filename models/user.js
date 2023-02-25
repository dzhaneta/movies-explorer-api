const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Введен некорректный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  toObject: { useProjection: true },
  toJSON: { useProjection: true },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        // пользователь с такой почтой не найден
        return Promise.reject(
          new UnauthorizedError('Неправильные почта или пароль'),
        );
      }

      // пользователь найден
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // хеши не совпали — отклоняем промис
            return Promise.reject(
              new UnauthorizedError('Неправильные почта или пароль'),
            );
          }

          // аутентификация успешна
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
