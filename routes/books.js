const express = require('express')
const {v4: uuid} = require("uuid");
const router = express.Router();
const fileMulter = require('../middleware/file');

class Book {
    constructor( title = "" , desc = "", id = uuid(),  authors = "", favorite = "", fileCover = "", fileName = "") {
        this.title = title;
        this.desc = desc;
        this.id = id;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
    }
}

const store = {
    books: [],
}

// [1, 2, 3].map(el => {
//     const newBook = new Book(`books ${el}`, `desc books ${el}`);
//     store.books.push(newBook);
// });

router.get('/api/books', (req, res) => {
    const {books} = store;
    res.json(books);
});
router.get('/api/books/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const index = books.findIndex(el => el.id === id);

    if (index !== -1){
        res.json(books[index])
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});
router.get('/api/books/:id/download', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const index = books.findIndex(el => el.id === id);

    if (index !== -1){
        res.download(books[index].fileName);
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});
router.post('/api/books', fileMulter.single('books-txt'), (req, res) => {
    const {id, title, desc, authors, favorite, fileCover, fileName} = req.params;
    if(req.file){
        const {path} = req.file;
        res.json({path});
    }
    res.json();
    store.books.push(new Book({id, title, desc, authors, favorite, fileCover, fileName}));
});
router.post('/api/user/login', (req, res) => {

});
router.put('/api/books/:id', (req, res) => {

});
router.delete('/api/books/:id', (req, res) => {

});

router.get('/', (req, res) => {
    const {books} = store;
    res.render("books/index", {
        title: "Books",
        books: books,
    });
});

router.get('/create', (req, res) => {
    res.render("books/create", {
        title: "Book | create",
        books: {},
    });
});

router.post('/create', (req, res) => {
    const {books} = store;
    const {title, desc, authors: authors, favorite: favorite, fileCover: fileCover} = req.body;

    const newBook = new Book(title, desc, authors, favorite, fileCover);
    books.push(newBook);

    res.redirect('/books')
});

router.get('/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    }

    res.render("books/view", {
        title: "Books | view",
        books: books[idx],
    });

});

router.get('/update/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    }

    res.render("books/update", {
        title: "Books | view",
        books: books[idx],
    });
});

router.post('/update/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const {title, desc, authors, favorite, fileCover} = req.body;
    const idx = books.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    }

    books[idx] = {
        ...books[idx],
        title,
        desc,
        authors,
        favorite,
        fileCover

    };
    res.redirect(`/books/${id}`);
});

router.post('/delete/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    }

    books.splice(idx, 1);
    res.redirect(`/books`);
});

module.exports = router;