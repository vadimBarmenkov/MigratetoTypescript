const express = require('express')
const { v4: uuid } = require('uuid')

const error404 = require('./middleware/err-404');
const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');


const app = express();
app.use(express.urlencoded());
app.set('view engine', 'ejs');

app.use('/books', booksRouter);
app.use('/', indexRouter);


app.use(error404);

const PORT = process.env.PORT || 3000
app.listen(PORT)