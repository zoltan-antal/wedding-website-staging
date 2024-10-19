import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import guestService from '../services/guestService';
import { GuestAttributes } from '../models/guests';

interface CreatePasswordRequest extends Request {
  body: {
    firstName: string;
    lastName: string;
    password: string;
  };
}

interface ChangePasswordRequest extends Request {
  body: {
    firstName: string;
    lastName: string;
    currentPassword: string;
    newPassword: string;
  };
}

interface SetEmailRequest extends Request {
  body: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface ChangeEmailRequest extends Request {
  body: {
    firstName: string;
    lastName: string;
    newEmail: string;
  };
}

const findGuest = async (req: Request, res: Response) => {
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
    hasPassword: !!guest.passwordHash,
    hasEmail: !!guest.email,
  });
};

const me = (req: Request, res: Response) => {
  const guest = req.user as GuestAttributes;
  if (!guest) {
    return res.status(404).json({
      error: 'Guest not found',
    });
  }
  return res.json({
    id: guest.id,
    firstName: guest.firstName,
    lastName: guest.lastName,
    householdId: guest.householdId,
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

  if (password.length < 6) {
    return res.status(400).json({
      error: 'Password must be at least 6 characters long',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  guest.passwordHash = passwordHash;
  await guest.save();

  return res.status(200).json({ message: 'Password successfully created' });
};

const changePassword = async (req: ChangePasswordRequest, res: Response) => {
  const { firstName, lastName, currentPassword, newPassword } = req.body;
  if (!firstName || !lastName || !currentPassword || !newPassword) {
    return res.status(400).json({
      error: 'Missing required fields',
    });
  }

  const guest = await guestService.getGuestByName({ firstName, lastName });
  if (!guest) {
    return res.status(404).json({
      error: 'Guest not found',
    });
  }

  const passwordCorrect = await bcrypt.compare(
    currentPassword,
    guest.passwordHash
  );
  if (!passwordCorrect) {
    return res.status(401).json({
      error: 'Incorrect current password',
    });
  }

  if (newPassword === currentPassword) {
    return res.status(400).json({
      error: 'Password must be different than current password',
    });
  }
  if (newPassword.length < 6) {
    return res.status(400).json({
      error: 'Password must be at least 6 characters long',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(newPassword, saltRounds);

  guest.passwordHash = passwordHash;
  await guest.save();

  return res.status(200).json({ message: 'Password successfully changed' });
};

const setEmail = async (req: SetEmailRequest, res: Response) => {
  const { firstName, lastName, email } = req.body;
  if (!firstName || !lastName || !email) {
    return res.status(400).json({
      error: 'Missing request body parameters',
    });
  }

  const guest = await guestService.getGuestByName({ firstName, lastName });
  if (!guest) {
    return res.status(404).json({
      error: 'Guest not found',
    });
  }

  if (guest.email !== null) {
    return res.status(403).json({
      error: 'Email has already been set',
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      error: 'Provided email is not valid',
    });
  }

  guest.email = email;
  await guest.save();

  return res.status(200).json({ message: 'Email successfully set' });
};

const changeEmail = async (req: ChangeEmailRequest, res: Response) => {
  const { firstName, lastName, newEmail } = req.body;
  if (!firstName || !lastName || !newEmail) {
    return res.status(400).json({
      error: 'Missing request body parameters',
    });
  }

  const guest = await guestService.getGuestByName({ firstName, lastName });
  if (!guest) {
    return res.status(404).json({
      error: 'Guest not found',
    });
  }

  if (!validator.isEmail(newEmail)) {
    return res.status(400).json({
      error: 'Provided email is not valid',
    });
  }

  guest.email = newEmail;
  await guest.save();

  return res.status(200).json({ message: 'Email successfully changed' });
};

export default {
  findGuest,
  me,
  createPassword,
  changePassword,
  setEmail,
  changeEmail,
};
