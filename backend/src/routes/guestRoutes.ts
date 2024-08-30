import { Router } from 'express';
import guestController from '../controllers/guestController';

const guestRoutes = Router();

guestRoutes.get('', (req, res, next) => {
  guestController.findUser(req, res).catch(next);
});

guestRoutes.post('/create-password', (req, res, next) => {
  guestController.createPassword(req, res).catch(next);
});

export default guestRoutes;
