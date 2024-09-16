import { Language } from './language';
import { Guest } from './guest';

export type Context = {
  language: Language;
  guest: Guest | null;
  setGuest: React.Dispatch<React.SetStateAction<Guest | null>>;
};
