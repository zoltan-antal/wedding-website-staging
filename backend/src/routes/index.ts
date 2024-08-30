import { Router } from 'express';
import householdRoutes from './householdRoutes';
import authRoutes from './authRoutes';
import guestRoutes from './guestRoutes';

const router = Router();

router.use('/households', householdRoutes);
router.use('/auth', authRoutes);
router.use('/guests', guestRoutes);

export default router;
