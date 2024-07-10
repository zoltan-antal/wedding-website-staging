import express from 'express';
import morgan from 'morgan';
require('express-async-errors');
import router from './routes';

const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use('/', router);
app.get('/ping', (_req, res) => {
  res.send('pong');
});

export default app;
