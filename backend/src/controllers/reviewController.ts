import { Request, Response } from 'express';
import Review, { IMovie, IReviewDetail } from '../schemas/review';
import { IUser } from '../schemas/user';

// 리뷰 생성
export const createReview = async (req: Request, res: Response) => {
  try {
    const review = JSON.parse(req.body.review) as IReviewDetail;
    const author = JSON.parse(req.body.author) as IUser;
    const movie = JSON.parse(req.body.movie) as IMovie;

    if (!review || !author || !movie) {
      return res.status(400).json({
        message: '필수 데이터가 빠져 리뷰 저장 할 수 없습니다.',
        success: false,
      });
    }

    const newReview = new Review({
      review: {
        content: review.content,
        rating: review.rating,
      },
      author: {
        _id: author._id,
        nickName: author.nickName,
        email: author.email,
      },
      movie: {
        id: movie.id,
        title: movie.title,
      },
    });

    await newReview.save();

    res
      .status(200)
      .json({ message: '리뷰 작성', success: true, review: newReview });
  } catch (error) {
    console.error('리뷰 작성 오류', error);
    res.status(500).json({ message: '리뷰 작성 실패', success: false });
  }
};

// 리뷰 수정
export const updateReview = (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: '리뷰 수정', success: true });
  } catch (error) {
    console.error('리뷰 수정 오류', error);
  }
};

// 리뷰 삭제
export const deleteReview = (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: '리뷰 삭제', success: true });
  } catch (error) {
    console.error('리뷰 삭제 오류', error);
  }
};
