import express from 'express';
import cors from 'cors';
import multer from 'multer';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// multipart/form-data 형식의 처리를 위한 미들웨어
const upload = multer();

app.post('/api/login', upload.none(), (req, res) => {
  const { id, password } = req.body;

  // Todo...
  // 로그인 로직 및 데이터베이스에서 사용자 인증 처리
  console.log('req:', req);
  console.log('ID:', id);
  console.log('Password:', password);

  // 임시 응답
  res.json({ message: '로그인 성공' });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
