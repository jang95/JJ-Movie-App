import { Request, Response } from 'express';
import User, { IUser } from '../schemas/user';
import bcrypt from 'bcryptjs';
import { Types } from 'mongoose';
import Review from '../schemas/review';
import { loginService } from '../services/authService';

// 회원가입
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, nickName } = req.body as IUser;

    // 기존 사용자가 있는지 확인
    const findUser = await User.findOne({ email });

    if (findUser) {
      return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
    }

    const hashPasswoard = bcrypt.hashSync(password, 10);

    // 새 사용자 생성
    const newUser = new User({
      nickName,
      email,
      password: hashPasswoard,
    });

    // 사용자 저장
    await newUser.save();

    res.status(201).json({ message: '회원가입이 성공적으로 완료되었습니다.' });
  } catch (error) {
    console.error('회원가입 오류:', error);
    res.status(500).json({ message: '서버 오류로 회원가입에 실패했습니다.' });
  }
};

// 로그인
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginService(email, password);

    if (!result) {
      return res.status(400).json({
        message: '이메일 또는 비밀번호가 잘못되었습니다.',
        success: false,
      });
    }

    res.status(200).json({
      message: '로그인 성공',
      success: true,
      accessToken: result.accessToken,
      user: result.user,
    });
  } catch (error) {
    console.error('로그인 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

// 로그아웃
export const logout = async (req: Request, res: Response) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  res.status(200).json({ message: '로그아웃 성공' });
};

// 회원탈퇴
export const withdrawal = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    await User.findOneAndDelete({ email });
    res.status(204).json({ message: '회원탈퇴 완료', success: true });
  } catch (error) {
    console.error('회원탈퇴 오류:', error);
    res.status(500).json({ message: '서버 오류로 회원탈퇴에 실패했습니다.' });
  }
};

// 사용자 작성 리뷰 조회
export const findUserReviews = async (req: Request, res: Response) => {
  const { userId } = req.query;

  try {
    const reviews = await Review.find({
      'author._id': new Types.ObjectId(userId as string),
    });
    res
      .status(200)
      .json({ message: '사용자 리뷰 조회', success: true, reviews });
  } catch (error) {
    console.error('사용자의 리뷰를 가져오는데 실패했습니다.', error);
  }
};
