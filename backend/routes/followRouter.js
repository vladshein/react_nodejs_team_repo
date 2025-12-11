import express from 'express';
import authenticate from '../middlewares/authenticate.js';
import { addToFollowingController } from '../controllers/followersController.js';

const followRouter = express.Router();

followRouter.post('/:id', authenticate, addToFollowingController);

export default followRouter;
