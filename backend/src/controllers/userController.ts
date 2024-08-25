import { Request, Response } from 'express';
import User, { IUser } from '../schemas/user';
import jwt from 'jsonwebtoken';

// 회원가입
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, nickName } = req.body as IUser;

    // 기존 사용자가 있는지 확인
    const findUser = await User.findOne({ email });

    if (findUser) {
      return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
    }

    // 새 사용자 생성
    const newUser = new User({
      nickName,
      email,
      password,
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

    if (password === checkUser.password) {
      return res
        .status(400)
        .json({ message: '이메일 또는 비밀번호가 잘못되었습니다.' });
    }

    const accessToken = jwt.sign(
      { email: checkUser.email },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { email: checkUser.email },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: '7d' }
    );

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
    });

    res.status(200).json({
      message: '로그인 성공',
      success: true,
      user: {
        email: checkUser.email,
        nickName: checkUser.nickName,
      },
    });
  } catch (error) {
    console.error('로그인 오류:', error);
  }
};
