# :popcorn: Movie Explorer (backend)

Backend для проекта **Movie Explorer** — приложения, в котором можно найти фильмы из архива BeatFilm Festival по запросу и сохранить в свою коллекцию.


## Techs

- Javascript
- Node.js
- Express
- MongoDB
- mongoose


## Документация к API

##### `POST /users/signup`
создаёт пользователя с переданными в теле `email, password и name`

##### `POST /users/signin` 
проверяет переданные в теле `email и password` и возвращает `JWT`

##### `POST /users/signout` 
удаляет `JWT` из куков пользователя 

##### `GET /users/me`
возвращает информацию о пользователе, его `email и name` - **роут защищен авторизацией**

##### `PATCH /users/me`
обновляет информацию о пользователе, его `email и name` - **роут защищен авторизацией**

##### `GET /movies`
возвращает все сохранённые пользователем фильмы - **роут защищен авторизацией**

##### `POST /movies`
создаёт фильм с переданными в теле `country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId` - **роут защищен авторизацией**

##### `DELETE /movies/_id `
удаляет сохранённый фильм по `id` - **роут защищен авторизацией**


## Фичи
- REST API
- все роуты, кроме signup и signin, защищены авторизацией
- **JWT** надежно хранится в httpOnly куках
- бережное хранение пароля в виде хэша
- валидация запросов к серверу (через **Joi** и **Celebrate**)
- валидация запросов к базе данных (через **Mongoose**)
- мидлвары безопасности:
  - контроль заголовков с [helmet](https://www.npmjs.com/package/helmet)
  - контроль числа запросов с [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
  - контроль кросс-доменных запросов с [cors](https://www.npmjs.com/package/cors)
- логирование запросов и ошибок


## URL

https://api.beatfilmlist.nomoredomains.work

IP  130.193.41.88

## Как запустить проект

* npm run start
запуск сервера на http://localhost:3000/

* npm run dev
запуск сервера с hot reload на http://localhost:3000/
