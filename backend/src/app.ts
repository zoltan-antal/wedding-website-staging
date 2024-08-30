import express from 'express';
import morgan from 'morgan';
require('express-async-errors');
import router from './routes';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import configurePassport from './utils/passport';

const app = express();

app.use(cookieParser());
configurePassport(passport);
app.use(passport.initialize());

app.use(express.json());
app.use(morgan('tiny'));
app.use('/', router);
app.get('/ping', (_req, res) => {
  res.send('pong');
});

export default app;
