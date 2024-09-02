import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// 로그인 검증
export const verifyLogin = (req: Request, res: Response) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(200).json({
        message: '로그인하지 않았습니다.',
        success: false,
      });
    }

    return res.status(200).json({
      message: '로그인 확인',
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

// 토큰 검증
export const verifyToken = (req: Request, res: Response) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(200).json({ message: '인증 토큰이 없습니다.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    console.log('decoded', decoded);

    if (!decoded) {
      return res.status(403).json({ message: '유효하지 않은 토큰입니다.' });
    }

    res.status(200).json({
      message: '토근 인증 성공',
      success: true,
      decoded,
    });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: '토큰이 만료되었습니다.' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res
        .status(401)
        .json({ message: '유효하지 않거나 구조 오류 토큰입니다.' });
    } else {
      return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  }
};

// 리프레시 토큰 검증 및 재발급
export const refreshAccessToken = (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: '리프레시 토큰이 없습니다.' });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as JwtPayload;

    if (!decoded) {
      return res
        .status(403)
        .json({ message: '유효하지 않은 리프레시 토큰입니다.' });
    }

    console.log('decoded', decoded);

    const user = { email: decoded.user.email, nickName: decoded.user.nickName };

    const newAccessToken = jwt.sign({ user }, process.env.JWT_SECRET!, {
      expiresIn: '15m',
    });

    const newRefreshToken = jwt.sign(
      { user },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' }
    );

    // 새로운 액세스 토큰을 쿠키에 저장
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: '새로운 토큰이 발급되었습니다.',
      success: true,
      accessToken: newAccessToken,
      user,
    });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res
        .status(401)
        .json({ message: '리프레시 토큰이 만료되었습니다.' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res
        .status(401)
        .json({ message: '리프레시 토큰이 유효하지 않거나 구조 문제입니다.' });
    } else {
      return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  }
};
