import { Request, Response } from 'express';

const submitRsvp = (_req: Request, res: Response) => {
  res.send(200);
};

export default {
  submitRsvp,
};
