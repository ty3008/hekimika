import { Router } from 'express';
import { getPosts, getPostBySlug, createPost, updatePost, deletePost } from '../controllers/blog.controller';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/', getPosts);
router.get('/:slug', getPostBySlug);
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

export default router;
