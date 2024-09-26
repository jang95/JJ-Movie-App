import { Request, Response } from 'express';

export const createPost = (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: '글 작성 작성', success: true });
  } catch (error) {
    console.error('글 작성 오류', error);
  }
};

export const updatePost = (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: '글 수정', success: true });
  } catch (error) {
    console.error('글 수정 오류', error);
  }
};

export const deletePost = (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: '글 삭제', success: true });
  } catch (error) {
    console.error('글 삭제 오류', error);
  }
};
