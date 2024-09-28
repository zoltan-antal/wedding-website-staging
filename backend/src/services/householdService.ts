import { Household } from '../models';
import {
  HouseholdAttributes,
  // HouseholdCreationAttributes,
} from '../models/households';

const getAllHouseholds = async (): Promise<HouseholdAttributes[]> => {
  return await Household.findAll();
};

// const createHousehold = async ({ username }: HouseholdCreationAttributes) => {
//   return await Household.create({ username });
// };

export default {
  getAllHouseholds,
  // createHousehold
};
