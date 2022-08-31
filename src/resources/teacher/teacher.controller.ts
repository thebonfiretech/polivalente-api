import { Request, Response} from 'express';

import {UserDecoded,RequestWithUserRole} from 'src/config/userRequestType';
import TeacherService from './teacher.services';

type user = {
        userid: string;
        email: string;
      }

export default class TeacherController {
        
        async signUp(req: Request, res: Response){
                const data = req.body;
                const teacherService = new TeacherService();
                const teacher = await teacherService.signUp(data, res);
                if (teacher) return res.status(200).json(teacher);
        }

        async signIn(req: Request, res: Response){
                const data = req.body;
                const teacherService = new TeacherService();
                const teacher = await teacherService.signIn(data, res);
                if (teacher) return res.status(200).json(teacher);
        }

        async updateUser(req: Request, res: Response){

        }

        async me(req: RequestWithUserRole, res: Response){
                const teacherService = new TeacherService();
                const user = req?.user;
                const currentTeacher = await teacherService.me(user, res);
                return res.status(201).json({teacher: currentTeacher})
        }

        async historic(req: Request, res: Response){
    
        }
        async updateHistoric(req: Request, res: Response){
    
        }

    
    
}