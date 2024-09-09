import express from 'express';
import multer from 'multer';
import {
  createReview,
  deleteReview,
  updateReview,
} from '../controllers/reviewController';

const router = express.Router();
const upload = multer();

router.post('/create', upload.none(), createReview);
router.post('/update', upload.none(), deleteReview);
router.post('/delete', updateReview);

export default router;
