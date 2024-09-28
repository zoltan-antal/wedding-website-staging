import { Router } from 'express';
import authController from '../controllers/authController';

const authRoutes = Router();

authRoutes.post('/login', (req, res, next) => {
  authController.loginGuest(req, res).catch(next);
});

authRoutes.post('/logout', (req, res) => {
  authController.logoutGuest(req, res);
});

authRoutes.get('/status', (req, res) => {
  authController.status(req, res);
});

export default authRoutes;
