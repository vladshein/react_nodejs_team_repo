import express from "express";
import validateBody from "../helpers/validateBody.js";
import upload from "../middlewares/upload.js";

import { registerSchema, loginSchema } from "../schemas/authSchemas.js";
import {
    registerController,
    loginController,
    getCurrentController,
    logoutController,
    updateAvatarController,
} from "../controllers/authControllers.js";

import authenticate from "../middlewares/authenticate.js";

const userRouter = express.Router();

userRouter.get("/current", authenticate, getCurrentController);
userRouter.patch("/avatars", authenticate, upload.single("avatar"), updateAvatarController);

export default userRouter;
