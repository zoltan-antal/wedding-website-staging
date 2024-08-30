import { Router } from 'express';
import guestController from '../controllers/guestController';
import { authenticateJwt } from '../utils/passport';

const guestRoutes = Router();

guestRoutes.get('', (req, res, next) => {
  guestController.findUser(req, res).catch(next);
});

guestRoutes.get('/me', authenticateJwt, (req, res) => {
  guestController.me(req, res);
});

guestRoutes.post('/password', (req, res, next) => {
  guestController.createPassword(req, res).catch(next);
});

guestRoutes.put('/password', (req, res, next) => {
  guestController.changePassword(req, res).catch(next);
});

export default guestRoutes;
