<h1 align="center">
Тестовое задание №1
</h1>

  <p align="center">
  <a href="https://www.npmjs.com/package/nestjs">
      <img src="https://img.shields.io/badge/nestjs-v8.0.0-blue.svg" alt="nestjs">
    </a>
    <a href="https://www.npmjs.com/package/express">
      <img src="https://img.shields.io/badge/express-v4.17.1-blue.svg" alt="express">
    </a>
    <a href="https://www.npmjs.com/package/sequelize">
      <img src="https://img.shields.io/badge/sequelize-v6.6.5-blue.svg" alt="sequelize">
    </a>
    <a href="https://www.npmjs.com/package/pg">
      <img src="https://img.shields.io/badge/pg-v8.6.0-blue.svg" alt="pg">
    </a>
    <br/>
    Задание выполнено на Node.js с использованием фреймворка Nest.js и Sequelize для работы с базой данных PostgreSQL.
  </p>
    <p align="center">

## Описание

При запуске, приложение создает в базе данных таблицу "users" с одним пользователем, у которого есть поле "balance" со значением 10000. Приложение имеет роут для обновления баланса пользователя, принимающий параметры userId и amount. Баланс пользователя не может быть отрицательным. Изменение баланса происходит в реальном времени.

## Установка

```bash
$ npm install
```

## Запуск

```bash
# development mode
$ npm run start:dev
```

## Оценка производительности

Для тестирование производительности и достижения конечной цели задачи, был создан роут GET `/users/test` который выполняет 10000 параллельных запросов одновремено на изменение баланса (-2) пользователя и выводит результаты в качестве объекта с полями сообщений, полученных от основного роута `/users/update-balance` с количеством запросов, каждого уникального сообщения.
