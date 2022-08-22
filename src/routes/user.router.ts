import { Router } from 'express';

import UserController from '@resources/user/user.controller';
import userAuthenticad from '@middlewares/userAuthenticad';

const userController = new UserController();
const userRouter = Router();

userRouter.post('/signin', userController.signIn)
userRouter.post('/signup', userController.signUp)
userRouter.get('/me', userAuthenticad , userController.me)

userRouter.get('/historic', userController.historic)
userRouter.post('/historic', userController.updateHistoric)

userRouter.post('/reportCard', userAuthenticad, userController.updateReportCard) 
userRouter.get('/reportCard', userAuthenticad, userController.reportCard)

export default userRouter