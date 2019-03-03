import express from 'express';
const router = express.Router();
import AuthRoutes from 'src/modules/authentication';
import CartRoutes from 'src/modules/cart';

router.use('/auth', AuthRoutes);
router.use('/cart', CartRoutes);

export default router;

