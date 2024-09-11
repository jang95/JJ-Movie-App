import express from 'express';
import multer from 'multer';
import {
  createReview,
  deleteReview,
  updateReview,
  viewReview,
} from '../controllers/reviewController';

const router = express.Router();
const upload = multer();

router.post('/create', upload.none(), createReview);
router.post('/update', upload.none(), deleteReview);
router.post('/delete', updateReview);

router.get('/view', upload.none(), viewReview);

export default router;
