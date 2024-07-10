import { Router } from 'express';
import householdController from '../controllers/householdController';

const householdRoutes = Router();

householdRoutes.get('/', (req, res, next) => {
  householdController.getAllHouseholds(req, res).catch(next);
});

householdRoutes.post('/', (req, res, next) => {
  householdController.createHousehold(req, res).catch(next);
});

export default householdRoutes;
