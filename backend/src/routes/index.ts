import { Router } from 'express';
import householdRoutes from './householdRoutes';

const router = Router();

router.use('/households', householdRoutes);

export default router;
