import express from 'express';
import { createPosts, getPosts, updatePost, deletePost, likePost, countPosts } from '../controllers/posts.js';

import auth from '../middleware/auth.js'
const router = express.Router();

router.get('/', getPosts);
router.get('/count', countPosts);
router.post('/', auth, createPosts);
router.patch('/:id', auth, updatePost);
router.patch('/:id/likePost', auth, likePost);
router.delete('/:id', auth, deletePost);

export default router;