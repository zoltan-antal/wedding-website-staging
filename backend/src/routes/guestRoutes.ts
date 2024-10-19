import { Router } from 'express';
import guestController from '../controllers/guestController';
import { authenticateJwt } from '../utils/passport';

const guestRoutes = Router();

guestRoutes.get('', (req, res, next) => {
  guestController.findGuest(req, res).catch(next);
});

guestRoutes.get('/me', authenticateJwt, (req, res) => {
  guestController.me(req, res);
});

guestRoutes.post('/password', (req, res, next) => {
  guestController.createPassword(req, res).catch(next);
});

guestRoutes.put('/password', authenticateJwt, (req, res, next) => {
  guestController.changePassword(req, res).catch(next);
});

guestRoutes.post('/email', (req, res, next) => {
  guestController.setEmail(req, res).catch(next);
});

guestRoutes.put('/email', (req, res, next) => {
  guestController.changeEmail(req, res).catch(next);
});

export default guestRoutes;
