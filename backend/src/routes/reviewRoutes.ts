import express from 'express';
import multer from 'multer';
import {
  createReview,
  deleteReview,
  findReview,
  updateReview,
  viewReview,
} from '../controllers/reviewController';

const router = express.Router();
const upload = multer();

router.post('/create', upload.none(), createReview);
router.post('/update', upload.none(), updateReview);
router.delete('/delete', deleteReview);
router.get('/view', upload.none(), viewReview);
router.get('/find', upload.none(), findReview);

export default router;
