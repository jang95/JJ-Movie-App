import jwt from 'jsonwebtoken';

// 토큰 생성
export const generateToken = (user: any, secret: string, expiresIn: string) => {
  return jwt.sign({ user }, secret, { expiresIn });
};
