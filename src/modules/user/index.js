import express from 'express';
const router = express.Router();
import UserController from './controller';

router.get('/profile', (req, res, next) => {
  return UserController.getUserProfile(req, res, next);
});

export default router;
