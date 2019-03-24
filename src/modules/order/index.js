import express from 'express';
const router = express.Router();
import OrderController from './controller';

router.get('/', (req, res, next) => {
  return OrderController.getOrderByUser(req, res, next);
})

router.post('/', (req, res, next) => {
  return OrderController.createOrder(req, res, next);
});

export default router;
