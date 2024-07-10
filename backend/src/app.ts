import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('tiny'));
app.get('/ping', (_req, res) => {
  res.send('pong');
});

export default app;
