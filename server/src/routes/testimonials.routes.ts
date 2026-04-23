import { Router } from 'express';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../controllers/testimonials.controller';
import { protect } from '../middleware/auth';

const router = Router();

// Public route to fetch testimonials for the homepage
router.get('/', getTestimonials);

// Protected routes for Admin
router.post('/', protect, createTestimonial);
router.put('/:id', protect, updateTestimonial);
router.delete('/:id', protect, deleteTestimonial);

export default router;
