import { Request, Response } from 'express';
import Review, { IMovie, IReviewDetail } from '../schemas/review';
import { IUser } from '../schemas/user';
import mongoose, { Types } from 'mongoose';

// 리뷰 생성
export const createReview = async (req: Request, res: Response) => {
  try {
    const review = JSON.parse(req.body.review) as IReviewDetail;
    const author = JSON.parse(req.body.author) as IUser;
    const movie = JSON.parse(req.body.movie) as IMovie;

    // 필수 데이터 누락 시 에러 반환
    if (!review || !review.content || !review.rating) {
      return res.status(400).json({
        message: '리뷰 정보가 누락되었습니다.',
        success: false,
      });
    }

    if (!author || !author._id || !author.nickName || !author.email) {
      return res.status(400).json({
        message: '작성자 정보가 누락되었습니다.',
        success: false,
      });
    }

    if (!movie || !movie.id || !movie.title) {
      return res.status(400).json({
        message: '영화 정보가 누락되었습니다.',
        success: false,
      });
    }

    // 새로운 리뷰 객체 생성
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

    // 리뷰 저장
    await newReview.save();

    return res.status(201).json({
      message: '리뷰가 성공적으로 작성되었습니다.',
      success: true,
      review: newReview,
    });
  } catch (error) {
    console.error('리뷰 작성 오류', error);
    res.status(500).json({ message: '리뷰 작성 실패', success: false });
  }
};

// 리뷰 목록 조회
export const viewReview = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    const reviews = await Review.find({ 'movie.id': id });
    res.status(200).json({ message: '리뷰 조회', success: true, reviews });
  } catch (error) {
    console.error('리뷰 조회 오류', error);
  }
};

// 리뷰 수정
export const updateReview = async (req: Request, res: Response) => {
  try {
    const review = JSON.parse(req.body.review) as IReviewDetail;

    if (!review) {
      return res.status(400).json({
        message: '필수 데이터가 빠져 리뷰 수정 할 수 없습니다.',
        success: false,
      });
    }

    // review 객체에서 최상위 _id에 접근
    const objectId = new mongoose.Types.ObjectId(review._id);

    // 리뷰 업데이트
    await Review.findOneAndUpdate(
      { objectId },
      {
        $set: {
          'review.content': review.content,
          'review.rating': review.rating,
        },
      },
      { new: true }
    );

    res.status(200).json({ message: '리뷰 수정', success: true });
  } catch (error) {
    console.error('리뷰 수정 오류', error);
    res.status(500).json({ message: '서버 오류', success: false });
  }
};

// 리뷰 삭제
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    await Review.findOneAndDelete({ _id: id });
    res.status(200).json({ message: '리뷰 삭제', success: true });
  } catch (error) {
    console.error('리뷰 삭제 오류', error);
  }
};

// 리뷰 조회
export const findReview = async (req: Request, res: Response) => {
  const { userId, movieId } = req.query;

  try {
    const review = await Review.findOne({
      'author._id': new Types.ObjectId(userId as string),
      'movie.id': movieId,
    });

    res.status(200).json({ message: '리뷰 조회', success: true, review });
  } catch (error) {
    console.error('리뷰 조회 오류', error);
  }
};
