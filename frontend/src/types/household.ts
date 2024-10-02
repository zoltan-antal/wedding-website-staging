import { Guest } from './guest';
import { RsvpSubmission } from './rsvp';

export type Household = {
  id: number;
  username: string;
  type: 'single' | 'couple' | 'family';
  special: boolean;
  guests: Pick<Guest, 'id' | 'firstName' | 'lastName'>[];
  rsvps: RsvpSubmission[];
};
