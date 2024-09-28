import { Household } from '../models';
import { HouseholdAttributes } from '../models/households';

const getAllHouseholds = async (): Promise<HouseholdAttributes[]> => {
  return await Household.findAll();
};

export default {
  getAllHouseholds,
};
