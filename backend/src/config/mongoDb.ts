import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// mongoose.connection는 Mongoose와 MongoDB 서버 간의 연결 상태를 나타내는 객체
export const connectMongoDB = async () => {
  // 연결 성공 시 메시지 출력
  mongoose.connection.on('connected', () => {
    console.log('Mongoose가 MongoDB에 연결 성공!');
  });

  // 연결 실패 시 에러 메시지 출력
  mongoose.connection.on('error', (err) => {
    console.error('Mongoose 연결에 error 발생!!:', err);
  });

  // 연결 종료 시 메시지 출력
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose의 MongoDB 연결 종료!');
  });

  try {
    // MongoDB에 연결
    await mongoose.connect(process.env.MONGO_URI!);
  } catch (error) {
    console.error('MongoDB에 연결하지 못했습니다.', error);
    // 3초 후 재연결 시도
    setTimeout(connectMongoDB, 3000);
  }
};
