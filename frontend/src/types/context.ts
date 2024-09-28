import { Language } from './language';
import { Guest } from './guest';
import { Household } from './household';

export type Context = {
  language: Language;
  guest: Guest | null;
  setGuest: React.Dispatch<React.SetStateAction<Guest | null>>;
  household: Household | null;
  setHousehold: React.Dispatch<React.SetStateAction<Household | null>>;
};
