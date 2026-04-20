import { Router } from 'express';
import {
    getContactMessages,
    createContactMessage,
    updateContactStatus,
    deleteContactMessage,
} from '../controllers/contact.controller';
import { protect } from '../middleware/auth';

const router = Router();

router.post('/', createContactMessage);
router.get('/', protect, getContactMessages);
router.put('/:id/status', protect, updateContactStatus);
router.delete('/:id', protect, deleteContactMessage);

export default router;
