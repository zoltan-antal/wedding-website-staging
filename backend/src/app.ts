import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
require('express-async-errors');
import router from './routes';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import configurePassport from './utils/passport';
import { FRONTEND_URL } from './utils/config';

const app = express();

switch (app.get('env')) {
  case 'development':
    app.use(cors());
    break;

  case 'production':
    app.use(cors({ origin: FRONTEND_URL }));
    break;
}

app.use(express.json());
app.use(cookieParser());
app.use(morgan('tiny'));

configurePassport(passport);
app.use(passport.initialize());

app.use('/', router);
app.get('/ping', (_req, res) => {
  res.send('pong');
});

export default app;
