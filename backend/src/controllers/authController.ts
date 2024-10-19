import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import guestService from '../services/guestService';
import { JWT_SECRET, NODE_ENV } from '../utils/config';

interface HouseholdLoginRequest extends Request {
  body: {
    firstName: string;
    lastName: string;
    password: string;
  };
}

const loginGuest = async (req: HouseholdLoginRequest, res: Response) => {
  const { firstName, lastName, password } = req.body;
  if (!firstName || !lastName || !password) {
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

  if (guest.passwordHash === null) {
    return res.status(403).json({
      error: 'Password not yet set',
    });
  }

  const passwordCorrect = await bcrypt.compare(password, guest.passwordHash);
  if (!passwordCorrect) {
    return res.status(401).json({
      error: 'Incorrect password',
    });
  }

  const guestForToken = {
    id: guest.id,
  };
  const token = jwt.sign(guestForToken, JWT_SECRET);

  res.cookie('authToken', token, {
    httpOnly: true,
    secure: NODE_ENV === 'production',
    sameSite: 'strict',
  });
  return res.status(200).json({ message: 'Successfully logged in' });
};

const logoutGuest = (_req: Request, res: Response) => {
  res.clearCookie('authToken', {
    httpOnly: true,
    secure: NODE_ENV === 'production',
    sameSite: 'strict',
  });
  return res.status(200).json({ message: 'Successfully logged out' });
};

const status = (req: Request, res: Response) => {
  if (req.cookies.authToken) {
    res.status(200).json({ loggedIn: true });
  } else {
    res.status(200).json({ loggedIn: false });
  }
};

export default { loginGuest, logoutGuest, status };
