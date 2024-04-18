import {Router} from "express";
import {container} from "../conteiner"

const router = Router();

router.get('', async (req, res) => {
    try {
        const repo: any = container.get("BOOKS_REPOSITORY");
        const book = await repo.getBooks();
        res.json(book);

    } catch (e) {
        res.status(500).json(e);
    }
});
router.get('/:id', async (req, res) => {
    const repo: any = container.get("BOOKS_REPOSITORY");
    const {id} = req.params;
    try {
        const book = await repo.getBook(id);
        res.json(book);
    } catch (e) {
        res.status(500).json(e);
    }
});
router.post('', async (req, res) => {
    const repo: any = container.get("BOOKS_REPOSITORY");
    try {
        const book = await repo.createBook(req.body);
        res.json(book);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.put('/:id', async (req, res) => {
    const repo: any = container.get("BOOKS_REPOSITORY");
    const {id} = req.params;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    try {
        await repo.updateBook(id, {title, description, authors, favorite, fileCover, fileName});
        res.redirect('/books/api/books/${id}');
    } catch (e) {
        res.status(500).json(e);
    }
});

router.delete('//:id', async (req, res) => {
    const repo: any = container.get("BOOKS_REPOSITORY");
    const {id} = req.params;
    try {
        await repo.deleteBook(id);
        res.json(true);
    } catch (e) {
        res.status(500).json(e);
    }
});

export default router;