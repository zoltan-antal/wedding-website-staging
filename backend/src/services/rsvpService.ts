import { Rsvp } from '../models';
import { RsvpCreationAttributes } from '../models/rsvp';

const createRsvp = async ({ guestId, householdId }: RsvpCreationAttributes) => {
  const rsvp = await Rsvp.create({ guestId, householdId });
  return rsvp;
};

const findRsvpsByHouseholdId = async (householdId: number) => {
  const rsvps = await Rsvp.findAll({ where: { householdId: householdId } });
  return rsvps;
};

export default { createRsvp, findRsvpsByHouseholdId };
