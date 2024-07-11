import { Router } from 'express';
import householdRoutes from './householdRoutes';
import loginRoutes from './loginRoutes';

const router = Router();

router.use('/households', householdRoutes);
router.use('/login', loginRoutes);

export default router;
