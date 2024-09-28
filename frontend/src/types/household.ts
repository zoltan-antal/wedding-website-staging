export type Household = {
  id: number;
  username: string;
  type: 'single' | 'couple' | 'family';
  special: boolean;
};
