import { Router } from 'express';
import {
    getPosts, getAllPostsAdmin, getPostBySlug, createPost, updatePost, deletePost,
    getCategories, createCategory, deleteCategory,
    getComments, createComment, getAllCommentsAdmin, approveComment, deleteComment,
} from '../controllers/blog.controller';
import { protect } from '../middleware/auth';

const router = Router();

// ── Specific static paths FIRST (before parameterized /:slug routes) ──

// Categories
router.get('/categories/all', getCategories);               // public
router.post('/categories', protect, createCategory);
router.delete('/categories/:id', protect, deleteCategory);

// Admin-only post list (includes drafts)
router.get('/admin/posts', protect, getAllPostsAdmin);

// Admin: all comments with post info
router.get('/admin/comments', protect, getAllCommentsAdmin);

// Comment moderation actions
router.patch('/comments/:id/approve', protect, approveComment);
router.delete('/comments/:id', protect, deleteComment);

// ── Post CRUD ──────────────────────────────────────────────────────────
router.get('/', getPosts);                                  // public: published (supports ?category=)
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);

// ── Parameterized slug routes LAST ─────────────────────────────────────
router.get('/:slug/comments', getComments);                 // public: approved comments for post
router.post('/:slug/comments', createComment);              // public: submit comment
router.get('/:slug', getPostBySlug);                        // public: single post by slug
router.delete('/:id', protect, deletePost);

export default router;
