import express from 'express';
import upload from '../middlewares/upload.js';
import authenticate from '../middlewares/authenticate.js';
import { getCurrentUser, getUserById } from './../controllers/userControllers.js';
import { updateAvatarController, getFollowersController } from '../controllers/authControllers.js';

const userRouter = express.Router();
userRouter.get('/current', authenticate, getCurrentUser);
userRouter.get('/:userId', authenticate, getUserById);
userRouter.patch('/avatars', authenticate, upload.single('avatar'), updateAvatarController);
userRouter.get('/followers', authenticate, getFollowersController);

export default userRouter;
