import express from 'express';
import multer from 'multer';
import { register } from '../controllers/userController';

const router = express.Router();
const upload = multer();

router.post('/', upload.none(), register);

export default router;
