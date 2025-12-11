import express from 'express';
import upload from '../middlewares/upload.js';
import { updateAvatarController } from '../controllers/authControllers.js';
import { getCurrentUser } from './../controllers/userControllers.js';
import authenticate from '../middlewares/authenticate.js';

const userRouter = express.Router();
userRouter.get('/current', authenticate, getCurrentUser);
userRouter.patch('/avatars', authenticate, upload.single('avatar'), updateAvatarController);

export default userRouter;
