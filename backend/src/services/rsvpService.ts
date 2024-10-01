import { Rsvp } from '../models';
import { RsvpCreationAttributes } from '../models/rsvp';

const createRsvp = async ({ guestId, householdId }: RsvpCreationAttributes) => {
  const rsvp = await Rsvp.create({ guestId, householdId });
  return rsvp;
};

export default { createRsvp };
