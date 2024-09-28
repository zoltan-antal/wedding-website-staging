import { Request, Response } from 'express';
import householdService from '../services/householdService';
// import { HouseholdCreationAttributes } from '../models/households';

// interface CreateHouseholdRequest extends Request {
//   body: HouseholdCreationAttributes;
// }

const getAllHouseholds = async (_req: Request, res: Response) => {
  const households = await householdService.getAllHouseholds();
  res.json(households);
};

// const createHousehold = async (req: CreateHouseholdRequest, res: Response) => {
//   const household = await householdService.createHousehold(req.body);
//   res.json(household);
// };

export default {
  getAllHouseholds,
  // createHousehold
};
