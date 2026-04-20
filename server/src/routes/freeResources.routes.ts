import { Router } from 'express';
import {
    getFreeResources,
    getFreeResourceById,
    createFreeResource,
    updateFreeResource,
    deleteFreeResource
} from '../controllers/freeResources.controller';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/', getFreeResources);
router.get('/:id', getFreeResourceById);

// Admin only routes
router.post('/', protect, createFreeResource);
router.put('/:id', protect, updateFreeResource);
router.delete('/:id', protect, deleteFreeResource);

export default router;
