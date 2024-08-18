import { Request, Response } from 'express';
import User from '../schemas/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 회원가입
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, nickName } = req.body;

    // 기존 사용자가 있는지 확인
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 새 사용자 생성
    const newUser = new User({
      nickName,
      email,
      password: hashedPassword,
    });

    // 사용자 저장
    await newUser.save();

    console.log('email', email);

    res.status(201).json({ message: '회원가입이 성공적으로 완료되었습니다.' });
  } catch (error) {
    console.error('회원가입 오류:', error);
    res.status(500).json({ message: '서버 오류로 회원가입에 실패했습니다.' });
  }
};

export const login = async (req: Request, res: Response) => {
  // Todo... 로그인 로직
};
