import express from 'express';
const router = express.Router();
import AuthRoutes from 'src/modules/authentication';

router.use('/auth', AuthRoutes);

export default router;

