import { Request, Response} from 'express';

import {UserDecoded,RequestWithUserRole} from 'src/config/userRequestType';
import UserService from './user.services';

type user = {
        userid: string;
        email: string;
      }

export default class UserController {
        
        async signUp(req: Request, res: Response){

                const data = req.body;
                const userService = new UserService();
                const user = await userService.signUp(data, res);
                if (user) return res.status(200).json(user);
        }

        async signIn(req: Request, res: Response){
                const data = req.body;
                const userService = new UserService();
                const user = await userService.signIn(data, res);
                if (user) return res.status(200).json(user);
        }

        async updateUser(req: Request, res: Response){

        }

        async me(req: RequestWithUserRole, res: Response){
                const userService = new UserService();
                const user = req?.user;
                const currentUser = await userService.me(user, res);
                return res.status(201).json({user: currentUser})
        }

        async historic(req: Request, res: Response){
    
        }
        async updateHistoric(req: Request, res: Response){
    
        }
        async reportCard(req: RequestWithUserRole, res: Response){
                const userId = req?.user?.id;
                const userService = new UserService();
                const reportCard = await userService.reportCard(userId, res)
                return res.status(200).json({reportCard})
        }

        async updateReportCard(req: Request, res: Response){
                const  reportCardInfo  = req.body;
                const userService = new UserService();
                await userService.updateReportCard(reportCardInfo, res)
                return res.sendStatus(200)
        }
    
    
}