import "reflect-metadata";
import express from "express";
import path from "path";
import logger from "morgan";
import booksRoutes from "./books/books.routes";


const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');

app.use('/api/books', booksRoutes);

const listener = app.listen(8080, function () {
    console.log("listen port " + listener.address().port);
});

