import express from 'express';
const router = express.Router();
import CartController from './controller';

router.get('/', (req, res, next) => {
  return CartController.getCart(req, res, next);
})

router.put('/', (req, res, next) => {
  return CartController.updateCart(req, res, next);
});

export default router;
