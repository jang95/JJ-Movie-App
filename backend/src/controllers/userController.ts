import { Request, Response } from 'express';
import User, { IUser } from '../schemas/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Types } from 'mongoose';
import Review from '../schemas/review';

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
    const { email, password } = req.body as IUser;

    // 사용자 이메일이 있는지 확인
    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return res
        .status(400)
        .json({ message: '이메일 또는 비밀번호가 잘못되었습니다.' });
    }

    const matchPassword = await bcrypt.compare(password, checkUser.password);

    if (!matchPassword) {
      return res
        .status(400)
        .json({ message: '이메일 또는 비밀번호가 잘못되었습니다.' });
    }

    // 토큰에 들어갈 내용
    const user = {
      email: checkUser.email,
      nickName: checkUser.nickName,
      _id: checkUser._id,
    };

    const accessToken = jwt.sign({ user }, process.env.JWT_SECRET!, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign({ user }, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: '7d',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 로그인 성공 응답
    res.status(200).json({
      message: '로그인 성공',
      success: true,
      accessToken,
      user,
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
