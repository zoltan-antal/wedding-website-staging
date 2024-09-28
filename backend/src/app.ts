import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { Resend } from 'resend';
require('express-async-errors');
import router from './routes';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import configurePassport from './utils/passport';
import { FRONTEND_URL, RESEND_API_KEY } from './utils/config';

const app = express();

switch (app.get('env')) {
  case 'development':
    app.use(
      cors({
        origin: (_origin, callback) => callback(null, true),
        credentials: true,
      })
    );
    break;

  case 'production':
    app.use(cors({ origin: FRONTEND_URL, credentials: true }));
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

const resend = new Resend(RESEND_API_KEY);

app.post('/email-test', (_req, res, next) => {
  resend.emails
    .send({
      from: 'noreply@auto.ellazoltan.com',
      to: 'info@ellazoltan.com',
      subject: 'TEST',
      html: '<p>This is a test email.</p>',
    })
    .then(() => {
      res.send('Test email sent.');
    })
    .catch(next);
});

export default app;
