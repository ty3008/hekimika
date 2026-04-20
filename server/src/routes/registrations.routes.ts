import { Router } from 'express';
import {
    getRegistrations,
    createRegistration,
    updateRegistrationStatus,
    deleteRegistration,
} from '../controllers/registrations.controller';
import { protect } from '../middleware/auth';

const router = Router();

router.post('/', createRegistration);
router.get('/', protect, getRegistrations);
router.put('/:id/status', protect, updateRegistrationStatus);
router.delete('/:id', protect, deleteRegistration);

export default router;
