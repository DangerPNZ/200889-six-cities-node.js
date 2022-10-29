# Личный проект «Шесть городов (простой)»

* Студент: [Антон Меднов](https://up.htmlacademy.ru/nodejs-api/2/user/200889).
* Наставник: [Павел Белик](https://htmlacademy.ru/profile/id84572).

---

_Не удаляйте и не изменяйте папки и файлы:_
_`.editorconfig`, `.gitattributes`, `.gitignore`._

---

## Памятка

### 1. Зарегистрируйтесь на Гитхабе

Если у вас ещё нет аккаунта на [github.com](https://github.com/join), скорее зарегистрируйтесь.

### 2. Создайте форк

Откройте репозиторий и нажмите кнопку «Fork» в правом верхнем углу. Репозиторий из Академии будет скопирован в ваш аккаунт.

<img width="769" alt="Press 'Fork'" src="https://cloud.githubusercontent.com/assets/259739/20264045/a1ddbf40-aa7a-11e6-9a1a-724a1c0123c8.png">

Получится вот так:

<img width="769" alt="Forked" src="https://cloud.githubusercontent.com/assets/259739/20264122/f63219a6-aa7a-11e6-945a-89818fc7c014.png">

### 3. Клонируйте репозиторий на свой компьютер

Будьте внимательны: нужно клонировать свой репозиторий (форк), а не репозиторий Академии. Также обратите внимание, что клонировать репозиторий нужно через SSH, а не через HTTPS. Нажмите зелёную кнопку в правой части экрана, чтобы скопировать SSH-адрес вашего репозитория:

<img width="769" alt="SSH" src="https://cloud.githubusercontent.com/assets/259739/20264180/42704126-aa7b-11e6-9ab4-73372b812a53.png">

Клонировать репозиторий можно так:

```
git clone SSH-адрес_вашего_форка
```

Команда клонирует репозиторий на ваш компьютер и подготовит всё необходимое для старта работы.

### 4. Начинайте обучение!

---

<a href="https://htmlacademy.ru/profession/fullstack"><img align="left" width="50" height="50" title="HTML Academy" src="https://up.htmlacademy.ru/static/img/intensive/nodejs/logo-for-github-2.png"></a>

Репозиторий создан для обучения на профессиональном онлайн‑курсе «[Node.js. Профессиональная разработка REST API](https://htmlacademy.ru/profession/fullstack)» от [HTML Academy](https://htmlacademy.ru).

---

Команда npm run mock:server поднимет сервер с моковыми данными, доступный по пути http://localhost:3030/api


---

### Запуск проекта:

---

Скачав проект, выполнить команду _npm i_ в терминале IDE

---

Создать файл .env и описать зависимости по примеру из файла .env.example

Список зависимостей

* PORT=4000 - порт проекта при запуске
* HOST=localhost - хост проекта при запуске

* SALT=12345 - соль пароля пользователей
* JWT_SECRET=JoT_SC_369 - секретная строка формирования JWT токена

* DB_HOST=128.0.0.1 - хост базы данных
* DB_PORT=27017 - порт базы данных
* DB_NAME=six-cities - имя базы данных
* DB_URL=mongodb://admin:test@mongodb:27017/ - url базы данных
* DB_USER=admin - логин пользователя базы данных
* DB_PASSWORD=test - пароль пользователя базы данных
* DB_INIT_USER=admin - логин дефолтного пользователя базы данных
* DB_INIT_PASSWORD=test - пароль дефолтного пользователя базы данных
* DB_ADMIN_USER_NAME=admin - логин админа базы данных
* DB_ADMIN_PASSWORD=test - пароль админа базы данны

---

Скачать программу Docker, запустить

---

Выполнить команду _docker-compose up -d_ в терминале IDE

___

### Сценарии

_npm run_
* _start_ - запускает проект
* _start:dev_ - запускает проект, логирование с подсветкой
* _build_ - собирает production версию (ts > js) в папку dist
* _lint_ - проверяет проект на наличие ошибок линтера
* _compile_ - компилирует ts файлы в js
* _clean_ - очищает директорию dist
* _ts_ - запускает ts файл по указанному пути
* _mock:server_ - поднимает json-mock-server. Становится доступен по пути http://localhost:3030/api

* _cli_ - запускает command line interface, по умолчанию выполняя команду -- --help
#### Доступные команды cli:
* * _-- --help_ - выводит подсказку по командам cli и их параметрам 
* * _-- --version_ - выводит версию проекта
* * _-- --generate_ - Генерирует данные, сохраняя в файл по указанному пути (Сначала необходимо запустить json-mock-server командой npm run mock:server в отдельном терминале).
Пример: -- --generate 30 ./src/mocks/test.tsv http://localhost:3030/api
* * _-- --import_ - Импортирует данные из файла в базу данных, создав предложения и пользователей.
Пример: -- --import ./src/mocks/rental-offers-mock.tsv admin test 127.0.0.1 six-cities salt1234567890
    (файл создавался вручную в рамках одного из заданий)









