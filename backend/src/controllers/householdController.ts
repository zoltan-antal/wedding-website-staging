import { Request, Response } from 'express';
import householdService from '../services/householdService';
import { GuestAttributes } from '../models/guests';

const getAllHouseholds = async (_req: Request, res: Response) => {
  const households = await householdService.getAllHouseholds();
  res.json(households);
};

const me = async (req: Request, res: Response) => {
  const guest = req.user as GuestAttributes;
  if (!guest) {
    return res.status(404).json({
      error: 'Guest not found',
    });
  }

  const household = await householdService.getHousehold(guest.householdId);
  if (!household) {
    return res.status(404).json({
      error: 'Household not found',
    });
  }

  return res.json({
    id: household.id,
    username: household.username,
    type: household.type,
    special: household.special,
  });
};

export default {
  getAllHouseholds,
  me,
};
