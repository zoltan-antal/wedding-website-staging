import { Guest, Household } from '../models';
import { HouseholdAttributes } from '../models/households';

type HouseholdWithGuests = Household & {
  guests: { id: number; firstName: string; lastName: string }[];
};

const getAllHouseholds = async (): Promise<HouseholdAttributes[]> => {
  return await Household.findAll();
};

const getHousehold = async (
  householdId: number
): Promise<HouseholdWithGuests | null> => {
  const householdWithGuests = await Household.findByPk(householdId, {
    include: [
      {
        model: Guest,
        as: 'guests',
        attributes: ['id', 'firstName', 'lastName'],
      },
    ],
  });

  return householdWithGuests as HouseholdWithGuests | null;
};

export default {
  getAllHouseholds,
  getHousehold,
};
