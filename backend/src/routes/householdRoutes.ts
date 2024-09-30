import { Router } from 'express';
import householdController from '../controllers/householdController';
import { authenticateJwt } from '../utils/passport';

const householdRoutes = Router();

// householdRoutes.get('/', (req, res, next) => {
//   householdController.getAllHouseholds(req, res).catch(next);
// });

householdRoutes.get('/me', authenticateJwt, (req, res, next) => {
  householdController.me(req, res).catch(next);
});

export default householdRoutes;
