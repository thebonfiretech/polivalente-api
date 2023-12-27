import { sendError } from "../../app.js";

import UsersService from "./users.service.js";

export default class usersController {
  async signUp(req, res) {
    const service = new UsersService();
    const response = await service.signUp(req.body);
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }

  async signIn(req, res){
    const service = new UsersService()
    const response = await service.signIn(req.body)
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
    const service = new UsersService()
    const response = await service.createUser(req.body)
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }

  async updateUser(req, res){
    const service = new UsersService()
    const response = await service.updateUser(req.body)
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
    const service = new UsersService()
    const response = await service.getUserById(req.body)
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }

  
}
