import { sendError } from "../../app.js";

import UsersService from "./users.service.js";

export default class usersController {
  async signUp(req, res) {
    var { name, email, password} = req.body;
    const service = new UsersService();
    const response = await service.signUp({name, email, password});
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }

  async signIn(req, res){
    var { email, password } = req.body;
    const service = new UsersService()
    const response = await service.signIn({email, password})
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }

  async getUser(req, res){
    var id = req.user.id;
    const service = new UsersService()
    const response = await service.getUserById({id})
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }

  async updateCurrentUser(req, res){
    var id = req.user.id;
    var data = req.body;
    const service = new UsersService()
    const response = await service.updateUser({id, data})
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }

  async createUser(req, res){
    var { name, role, flags} = req.body;
    const service = new UsersService()
    const response = await service.createUser({name, role, flags})
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }

  async updateUser(req, res){
    var { id, data } = req.body;
    const service = new UsersService()
    const response = await service.updateUser({id, data})
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }

  async getUsers(req, res){
    const service = new UsersService()
    const response = await service.getUsers()
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }
  async getTeachers(req, res){
    const service = new UsersService()
    const response = await service.getTeachers()
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }
  async getUserById(req, res){
    var  { id } = req.body;
    const service = new UsersService()
    const response = await service.getUserById({id})
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }

  
}
