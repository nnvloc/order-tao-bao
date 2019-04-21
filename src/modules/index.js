import express from 'express';
const router = express.Router();
import AuthRoutes from 'src/modules/authentication';
import CartRoutes from 'src/modules/cart';
import OrderRoutes from 'src/modules/order';
import UserRoutes from 'src/modules/user';
import TransactionRoutes from 'src/modules/transactions';

router.use('/auth', AuthRoutes);
router.use('/cart', CartRoutes);
router.use('/orders', OrderRoutes);
router.use('/users', UserRoutes);
router.use('/transactions', TransactionRoutes);

export default router;

