import { Gift, Household } from '../models';
import { GiftAttributes } from '../models/gifts';

const getAllGifts = async (): Promise<GiftAttributes[]> => {
  return await Gift.findAll();
};

const claimGift = async ({
  giftId,
  householdId,
}: {
  giftId: number;
  householdId: number;
}) => {
  const gift = await Gift.findByPk(giftId);
  if (!gift) {
    throw new Error('Gift not found');
  }

  if (gift.householdId !== null && gift.householdId !== householdId) {
    const error = new Error('Gift has already been claimed');
    error.name = 'ConflictError';
    throw error;
  }

  const household = await Household.findByPk(householdId);
  if (!household) {
    throw new Error('Household not found');
  }

  gift.householdId = householdId;
  await gift.save();

  return gift;
};

const unclaimGift = async ({
  giftId,
  householdId,
}: {
  giftId: number;
  householdId: number;
}) => {
  const gift = await Gift.findByPk(giftId);
  if (!gift) {
    throw new Error('Gift not found');
  }

  if (gift.householdId === null) {
    return gift;
  }

  if (gift.householdId !== householdId) {
    const error = new Error(
      'Gift can only be unclaimed by the household that claimed it'
    );
    error.name = 'ForbiddenError';
    throw error;
  }

  gift.householdId = null;
  await gift.save();

  return gift;
};

export default {
  getAllGifts,
  claimGift,
  unclaimGift,
};
