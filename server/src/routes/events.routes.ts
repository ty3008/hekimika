import { Router } from 'express';
import {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
} from '../controllers/events.controller';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', protect, createEvent);
router.put('/:id', protect, updateEvent);
router.delete('/:id', protect, deleteEvent);

export default router;
