import { Household, Guest, Rsvp } from '../models';
import { HouseholdAttributes } from '../models/households';

type HouseholdWithGuestsAndRsvps = Household & {
  guests: { id: number; firstName: string; lastName: string }[];
  rsvps: { id: number; createdAt: string; guestId: number }[];
};

const getAllHouseholds = async (): Promise<HouseholdAttributes[]> => {
  return await Household.findAll();
};

const getHousehold = async (
  householdId: number
): Promise<HouseholdWithGuestsAndRsvps | null> => {
  const householdWithGuestsAndRsvps = await Household.findByPk(householdId, {
    include: [
      {
        model: Guest,
        as: 'guests',
        attributes: ['id', 'firstName', 'lastName'],
      },
      {
        model: Rsvp,
        as: 'rsvps',
        attributes: ['id', 'createdAt', 'guestId'],
      },
    ],
  });

  return householdWithGuestsAndRsvps as HouseholdWithGuestsAndRsvps | null;
};

export default {
  getAllHouseholds,
  getHousehold,
};
