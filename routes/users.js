import express from 'express';
import { } from '../controllers/posts.js';
import { signIn, signUp } from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signIn);
router.post('/signin', signUp);

export default router;