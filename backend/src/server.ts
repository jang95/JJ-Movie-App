import app from './app';
import { connectMongoDB } from './config/mongoDb';

const startServer = async () => {
  try {
    await connectMongoDB();
    app.listen(process.env.PORT, () => {
      console.log(`${process.env.PORT}번 포트 실행 완료`);
    });
  } catch (error) {
    console.error('서버 연결 실패', error);
    process.exit(1); // 프로세스 종료
  }
};

startServer();
