import { Request, Response } from 'express';
import giftService from '../services/giftService';
import { GuestAttributes } from '../models/guests';

const getAllGifts = async (_req: Request, res: Response) => {
  const gifts = await giftService.getAllGifts();
  res.json(gifts);
};

const claimGift = async (req: Request, res: Response) => {
  const giftId = parseInt(req.params.id, 10);
  const householdId = (req.user as GuestAttributes).householdId;

  if (isNaN(giftId)) {
    return res.status(400).json({ error: 'Invalid gift ID' });
  }

  try {
    const gift = await giftService.claimGift({ giftId, householdId });
    return res.status(200).json(gift);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === 'ConflictError') {
        return res.status(409).json({ error: error.message });
      } else {
        return res.status(400).json({ error: error.message });
      }
    } else {
      return res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

const unclaimGift = async (req: Request, res: Response) => {
  const giftId = parseInt(req.params.id, 10);
  const householdId = (req.user as GuestAttributes).householdId;

  if (isNaN(giftId)) {
    return res.status(400).json({ error: 'Invalid gift ID' });
  }

  try {
    const gift = await giftService.unclaimGift({ giftId, householdId });
    return res.status(200).json(gift);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === 'ForbiddenError') {
        return res.status(403).json({ error: error.message });
      } else {
        return res.status(400).json({ error: error.message });
      }
    } else {
      return res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

export default {
  getAllGifts,
  claimGift,
  unclaimGift,
};
