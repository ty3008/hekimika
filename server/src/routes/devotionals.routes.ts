import { Router } from 'express';
import { getDevotionals, createDevotional, updateDevotional, deleteDevotional } from '../controllers/devotionals.controller';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/', getDevotionals);
router.post('/', protect, createDevotional);
router.put('/:id', protect, updateDevotional);
router.delete('/:id', protect, deleteDevotional);

export default router;
