import { Router } from 'express';
import rsvpController from '../controllers/rsvpController';
import { authenticateJwt } from '../utils/passport';

const rsvpRoutes = Router();

rsvpRoutes.post('/', authenticateJwt, (req, res) => {
  rsvpController.submitRsvp(req, res);
});

export default rsvpRoutes;
