# :popcorn: Movie Explorer (backend)

Backend для проекта **Movie Explorer** — приложения, в котором можно найти фильмы из архива BeatFilm Festival по запросу и сохранить в свою коллекцию.

## Techs---
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


## URL

https://api.beatfilmlist.nomoredomains.work

IP  130.193.41.88

## Как запустить проект

* npm run start
запускает приложение в режиме разработки
открывает приложение в браузере по http://localhost:3000
страница будет автоматически обновляться при внесении любых изменений в код

* npm run build
делает итоговую сборку приложения в папку build
оптимизируется весь код приложения для лучшего перфоманса
для нейминга файлов используется хэширование
