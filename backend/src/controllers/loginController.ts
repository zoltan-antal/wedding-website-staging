import { Request, Response } from 'express';
import guestService from '../services/guestService';

interface HouseholdLoginRequest extends Request {
  body: {
    firstName: string;
    lastName: string;
  };
}

const loginGuest = async (req: HouseholdLoginRequest, res: Response) => {
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    return res.status(400).json({
      error: 'Missing credentials',
    });
  }

  const guest = await guestService.getGuestByName({ firstName, lastName });
  if (!guest) {
    return res.status(404).json({
      error: 'User not found',
    });
  }

  return res.status(200).json(guest);
};

export default { loginGuest };
