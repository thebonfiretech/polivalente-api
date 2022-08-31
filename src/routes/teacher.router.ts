import { Router } from 'express';

import TeacherController from '@resources/teacher/teacher.controller';
import userAuthenticad from '@middlewares/userAuthenticad';

const teacherController = new TeacherController();
const teacherRouter = Router();

teacherRouter.post('/signin', teacherController.signIn)
teacherRouter.post('/signup', teacherController.signUp)
teacherRouter.get('/me', userAuthenticad , teacherController.me)

export default teacherRouter