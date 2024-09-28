import { Request, Response } from 'express';
import householdService from '../services/householdService';

const getAllHouseholds = async (_req: Request, res: Response) => {
  const households = await householdService.getAllHouseholds();
  res.json(households);
};

export default {
  getAllHouseholds,
};
