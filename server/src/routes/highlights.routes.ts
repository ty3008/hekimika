import { Router } from 'express';
import {
    getHighlights, createHighlight, updateHighlight, deleteHighlight
} from '../controllers/highlights.controller';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/', getHighlights);
router.post('/', protect, createHighlight);
router.put('/:id', protect, updateHighlight);
router.delete('/:id', protect, deleteHighlight);

export default router;
