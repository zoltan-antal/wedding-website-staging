import { Guest } from './guest';

export type Household = {
  id: number;
  username: string;
  type: 'single' | 'couple' | 'family';
  special: boolean;
  guests: Pick<Guest, 'id' | 'firstName' | 'lastName'>[];
};
