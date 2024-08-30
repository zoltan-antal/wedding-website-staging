import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import guestService from '../services/guestService';
import loginController from './loginController';

interface CreatePasswordRequest extends Request {
  body: {
    firstName: string;
    lastName: string;
    password: string;
  };
}

const findUser = async (req: Request, res: Response) => {
  const { firstName, lastName } = req.query;
  if (!firstName || !lastName) {
    return res.status(400).json({
      error: 'Missing query parameters',
    });
  }
  if (typeof firstName !== 'string' || typeof lastName !== 'string') {
    return res.status(400).json({
      error: 'Invalid query parameters',
    });
  }

  const guest = await guestService.getGuestByName({ firstName, lastName });
  if (!guest) {
    return res.status(404).json({
      error: 'Guest not found',
    });
  }

  return res.status(200).json({
    id: guest.id,
    firstName: guest.firstName,
    lastName: guest.lastName,
    password: !!guest.passwordHash,
  });
};

const createPassword = async (req: CreatePasswordRequest, res: Response) => {
  const { firstName, lastName, password } = req.body;
  if (!firstName || !lastName || !password) {
    return res.status(400).json({
      error: 'Missing credentials',
    });
  }

  const guest = await guestService.getGuestByName({ firstName, lastName });
  if (!guest) {
    return res.status(404).json({
      error: 'Guest not found',
    });
  }

  if (guest.passwordHash !== null) {
    return res.status(403).json({
      error: 'Password has already been created',
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      error: 'Password must be at least 8 characters long',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  guest.passwordHash = passwordHash;
  await guest.save();

  return loginController.loginGuest(req, res);
};

export default { findUser, createPassword };
