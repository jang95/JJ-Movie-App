import app from './app';

const PORT = process.env.PORT || 5100;

app.listen(PORT, () => {
  console.log(`${PORT}번 포트 실행 완료`);
});
