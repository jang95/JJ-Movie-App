import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const connectMongoDB = async () => {
  // MongoDB에 연결
  await mongoose.connect(process.env.MONGO_URI!);

  // 연결 성공 시 메시지 출력
  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
  });

  // 연결 실패 시 에러 메시지 출력
  mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
  });

  // 연결 종료 시 메시지 출력, Todo... 재연결 시도?
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from MongoDB');
  });
};
