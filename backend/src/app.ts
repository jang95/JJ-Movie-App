import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/register', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
