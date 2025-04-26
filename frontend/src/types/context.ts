import { Language } from './language';
import { Guest } from './guest';
import { Household } from './household';

export type Context = {
  mobileView: boolean;
  language: Language;
  isInitialised: boolean;
  guest: Guest | null;
  setGuest: React.Dispatch<React.SetStateAction<Guest | null>>;
  household: Household | null;
  setHousehold: React.Dispatch<React.SetStateAction<Household | null>>;
  mainRef: React.MutableRefObject<HTMLElement | null>;
  navWidth: number;
};
