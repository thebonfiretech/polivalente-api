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
    
}