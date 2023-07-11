import UserService from './user.services.js';


export default class UserController {
        
        async signUp(req, res){
                const data = req.body;
                const userService = new UserService();
                const user = await userService.signUp(data, res);
                if (user) return res.status(200).json(user);
        }

        async signIn(req, res){
                const data = req.body;
                const userService = new UserService();
                const user = await userService.signIn(data, res);
                if (user) return res.status(200).json(user);
        }

        async updateUser(req, res){

        }

        async me(req, res){
                const userService = new UserService();
                const user = req?.user;
                const currentUser = await userService.me(user, res);
                return res.status(201).json({user: currentUser})
        }
    
}