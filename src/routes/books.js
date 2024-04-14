import {BooksRepository} from "../book/BooksRepository";

const express = require('express')
const router = express.Router();
const Book = require('../models/books');
import {container} from "index"



router.get('/api/books', async (req, res) => {
    try {
        const repo = container.get(BooksRepository);
        const book = await repo.getBooks();
        res.json(book);

    } catch (e) {
        res.status(500).json(e);
    }
});
router.get('/api/books/:id', async (req, res) => {
    const repo = container.get(BooksRepository);
    const {id} = req.params;
    try {
        const book = await repo.getBook(id);
        res.json(book);
    } catch (e) {
        res.status(500).json(e);
    }
});
router.post('/api/books', async (req, res) => {
    const repo = container.get(BooksRepository);
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const newBook = new Book({title, description, authors, favorite, fileCover, fileName});
    try {
        const book = await repo.createBook(newBook);
        res.json(newBook);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.put('/api/books/:id', async (req, res) => {
    const repo = container.get(BooksRepository);
    const {id} = req.params;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    try {
        await repo.updateBook(id, {title, description, authors, favorite, fileCover, fileName});
        res.redirect('/books/api/books/${id}');
    } catch (e) {
        res.status(500).json(e);
    }
});

router.delete('/api/books/:id', async (req, res) => {
    const repo = container.get(BooksRepository);
    const {id} = req.params;
    try {
        await repo.deleteBook(id);
        res.json(true);
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;