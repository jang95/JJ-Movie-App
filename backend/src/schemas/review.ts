import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './user';

export interface IReviewDetail {
  _id: string;
  content: string;
  rating: number;
  tags?: string[];
}

export interface IMovie {
  id: string;
  title: string;
}

export interface IReview extends Document {
  review: IReviewDetail;
  author: IUser;
  movie: IMovie;
}

const reviewSchema = new Schema<IReview>(
  {
    review: {
      content: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      tags: [
        {
          type: String,
          trim: true,
        },
      ],
    },
    author: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      nickName: {
        type: String,
        required: true,
      },
    },
    movie: {
      id: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Review = mongoose.model<IReview>('Review', reviewSchema);

export default Review;