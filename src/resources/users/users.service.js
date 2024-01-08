import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userModel from "../../models/user.js";

export default class usersService {

    async signUp({name, email, password}){
        try {
            const findUsers = await userModel.find({
              status: "notRegistered",
            });
            var findUser = findUsers.find(x => x.name.trim().replace(/\s/g, '') == name.trim().replace(/\s/g, ''));
            if (!findUser) return { error: "user_not_registered" };
            
            const findEmail = await userModel.findOne({email});
            if (findEmail) return { error: "email_already_exists"};

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const user = await userModel.findByIdAndUpdate(findUser._id, {
                status: 'logged',
                password: hash,
                email, 
                name, 

            }, {new: true});
            
            var payload = {
                _id: user._id,
                name
            }
            var token = jwt.sign(payload, process.env.JWT, { expiresIn : '5 days'});
            return { token }

        } catch (err) {
            return { error: "internal_error" } ;
        }
    }
    async signIn({email, password}){
        try {
           const user = await userModel.findOne({email});
           if (!user) return { error: "user_not_registered"};

           const isMatch = bcrypt.compare(password, user.password);
           if (!isMatch) return { error: "invalid_credentials"};

            var payload = {
                _id: user._id
            }
            var token = jwt.sign(payload, process.env.JWT, { expiresIn : '5 days'});
            return { token }
           
        } catch (err) {
            return { error: "internal_error" } ;
        }
    }
    async getUserById({id}){
        try {
           const user = await userModel.findById(id);
           if (!user) return { error: "user_not_registered"};
           return { user };
        } catch (err) {
            console.log(err)
            return { error: "user_not_registered" } ;
        }
    }
    async updateUser({id, data}){
        try {
           const user = await userModel.findById(id);
           if (!user) return { error: "user_not_registered"};
           console.log(data)

           const newUser = await userModel.findByIdAndUpdate(id, {$set: {...data}}, {new: true, upsert: true});
           return { user: newUser};
        } catch (err) {
            return { error: "internal_error" } ;
        }
    }
    async createUser({name, role, flags=[]}){
        try {
            const user = new userModel({
                name,
                role,
                flags
            });

            await user.save()

            return { user }
           
        } catch (err) {
            console.log(err)
            return { error: "internal_error" } ;
        }
    }
    async getUsers(){
        try {
           return await userModel.find().sort({date: -1});
        } catch (err) {
            return { error: "internal_error" } ;
        }
    }
    async getTeachers(){
        try {
            return await userModel.find().sort({date: -1});
        } catch (err) {
            return { error: "internal_error" } ;
        }
    }
    
}