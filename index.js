const express = require('express');
const mongoose = require('mongoose');
const {v4: uuid} = require('uuid');

const error404 = require('./src/middleware/err-404');
const indexRouter = require('./src/routes/index');
const booksRouter = require('./src/routes/books');


const index = express();
index.use(express.json());
index.set('view engine', 'ejs');

index.use('/books', booksRouter);
index.use('/', indexRouter);
index.use(error404);

async function start(PORT, UrlDB) {
    try {
        await mongoose.connect(UrlDB, {
            dbName: "books" // имя базы данных
        });
        index.listen(PORT);
    } catch (e) {
        console.log(e);
    }
}

const UrlDB = "mongodb://root:example@mongo:27017/";
const PORT = process.env.PORT || 3000

start(PORT, UrlDB);