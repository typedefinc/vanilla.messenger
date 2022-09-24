import express from 'express';
import userController from '../controllers/user/userController';
import { body } from 'express-validator';
import authMiddleware from '../middlewares/auth/authMiddleware';

const router = express.Router();

router.post('/signup',
  body('email').isEmail(),
  body('password').isLength({min: 8, max: 32}),
  userController.signup
);

router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);

export default router;