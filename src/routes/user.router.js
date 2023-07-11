import { Router } from 'express';

import UserController from '../resources/user/user.controller.js';
import userAuthenticad from '../middlewares/userAuthenticad.js';

const userController = new UserController();
const userRouter = Router();

userRouter.post('/signin', userController.signIn)
userRouter.post('/signup', userController.signUp)
userRouter.get('/me', userAuthenticad , userController.me)

export default userRouter