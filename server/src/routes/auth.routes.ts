import { Router } from 'express';
import { login, getMe, resetAdmin } from '../controllers/auth.controller';
import { protect } from '../middleware/auth';

const router = Router();

router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/reset-admin', resetAdmin);

export default router;
