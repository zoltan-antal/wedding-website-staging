import { Household } from '../models';
import { HouseholdAttributes } from '../models/households';

const getAllHouseholds = async (): Promise<HouseholdAttributes[]> => {
  return await Household.findAll();
};

const getHousehold = async (
  householdId: number
): Promise<HouseholdAttributes | null> => {
  return await Household.findByPk(householdId);
};

export default {
  getAllHouseholds,
  getHousehold,
};
