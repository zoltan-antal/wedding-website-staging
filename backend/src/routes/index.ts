import { Router } from 'express';
import householdRoutes from './householdRoutes';
import loginRoutes from './loginRoutes';
import guestRoutes from './guestRoutes';

const router = Router();

router.use('/households', householdRoutes);
router.use('/login', loginRoutes);
router.use('/guests', guestRoutes);

export default router;
