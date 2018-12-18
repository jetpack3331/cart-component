import express from 'express';

import cartRoutes from './cart';

const router = express.Router();

router.use(cartRoutes);

export default router;