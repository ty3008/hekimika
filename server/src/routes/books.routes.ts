import { Router } from 'express';
import { getBooks, createBook, updateBook, deleteBook } from '../controllers/books.controller';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/', getBooks);
router.post('/', protect, createBook);
router.put('/:id', protect, updateBook);
router.delete('/:id', protect, deleteBook);

export default router;
