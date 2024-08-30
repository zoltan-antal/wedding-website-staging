import { Router } from 'express';
import guestController from '../controllers/guestController';

const guestRoutes = Router();

guestRoutes.get('', (req, res, next) => {
  guestController.findUser(req, res).catch(next);
});

guestRoutes.post('/password', (req, res, next) => {
  guestController.createPassword(req, res).catch(next);
});

guestRoutes.put('/password', (req, res, next) => {
  guestController.changePassword(req, res).catch(next);
});

export default guestRoutes;
