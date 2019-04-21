import express from 'express';
const router = express.Router();
import Controller from './controller';

router.get('/history', (req, res, next) => {
  return Controller.getHistory(req, res, next);
});

router.post('/add-money', (req, res, next) => {
  return Controller.addMoney(req, res, next);
});

router.put('/:transactionId/approve', (req, res, next) => {
  return Controller.approveTransaction(req, res, next);
});

router.post('/pay-deposit', (req, res, next) => {
  return Controller.payDeposit(req, res, next);
});

router.post('/pay-order', (req, res, next) => {
  return Controller.payOrder(req, res, next);
})

export default router;
