import { Router } from 'express';
import giftController from '../controllers/giftController';
import { authenticateJwt } from '../utils/passport';

const giftRoutes = Router();

giftRoutes.get('/', authenticateJwt, (req, res, next) => {
  giftController.getAllGifts(req, res).catch(next);
});

giftRoutes.patch('/:id/claim', authenticateJwt, (req, res, next) => {
  giftController.claimGift(req, res).catch(next);
});

giftRoutes.patch('/:id/unclaim', authenticateJwt, (req, res, next) => {
  giftController.unclaimGift(req, res).catch(next);
});

export default giftRoutes;
