import express from 'express';
const router = express.Router();
import AuthRoutes from 'src/modules/authentication';
import CartRoutes from 'src/modules/cart';
import OrderRoutes from 'src/modules/order';
import UserRoutes from 'src/modules/user';

router.use('/auth', AuthRoutes);
router.use('/cart', CartRoutes);
router.use('/orders', OrderRoutes);
router.use('/users', UserRoutes);

export default router;

