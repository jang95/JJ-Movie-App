import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import cookieParser from 'cookie-parser';
import reviewRoutes from './routes/reviewRoutes';

const app = express();

app.use(
  cors({
    origin: 'https://localhost:5173',
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRoutes);
app.use('/review', reviewRoutes);

export default app;
