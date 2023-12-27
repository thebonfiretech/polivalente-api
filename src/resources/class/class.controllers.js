import { sendError } from "../../app.js";

import ClassService from "./class.service.js";

export default class classController {
  async createClass(req, res) {
    const service = new ClassService();
    const response = await service.createClass(req.body);
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }
  async updateClass(req, res) {
    const service = new ClassService();
    const response = await service.updateClass(req.body);
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }
  async getClass(req, res) {
    const service = new ClassService();
    const response = await service.getClass(req.body);
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }
  async getAllClasses(req, res) {
    const service = new ClassService();
    const response = await service.getAllClasses(req.body);
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }
  async deleteClass(req, res) {
    const service = new ClassService();
    const response = await service.deleteClass(req.body);
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }
}
