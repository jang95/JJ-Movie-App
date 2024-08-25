import express from 'express';
import multer from 'multer';
import { register, login } from '../controllers/userController';
import {
  refreshAccessToken,
  verifyToken,
  verifyLogin,
} from '../middleware/authMiddleware';

const router = express.Router();
const upload = multer();

router.post('/register', upload.none(), register);
router.post('/login', upload.none(), login);

router.get('/token', verifyToken);
router.get('/check', verifyLogin);
router.post('/refresh', refreshAccessToken);

export default router;
