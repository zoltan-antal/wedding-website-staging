import { Router } from 'express';
import householdRoutes from './householdRoutes';
import authRoutes from './authRoutes';
import guestRoutes from './guestRoutes';
import giftRoutes from './giftRoutes';
import rsvpRoutes from './rsvpRoutes';

const router = Router();

router.use('/households', householdRoutes);
router.use('/auth', authRoutes);
router.use('/guests', guestRoutes);
router.use('/gifts', giftRoutes);
router.use('/rsvp', rsvpRoutes);

export default router;
