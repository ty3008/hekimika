import { Router } from 'express';
import {
    getPrograms, getProgramBySlug, createProgram, updateProgram, deleteProgram
} from '../controllers/programs.controller';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/', getPrograms);
router.get('/:slug', getProgramBySlug);
router.post('/', protect, createProgram);
router.put('/:id', protect, updateProgram);
router.delete('/:id', protect, deleteProgram);

export default router;
