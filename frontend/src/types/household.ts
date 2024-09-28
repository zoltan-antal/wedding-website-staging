export type Household = {
  id: string;
  username: string;
  type: 'single' | 'couple' | 'family';
  special: boolean;
};
