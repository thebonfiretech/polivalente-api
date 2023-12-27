import { sendError } from "../../app.js";

import SacService from "./sac.service.js";

export default class sacController {
  async createSac(req, res) {
    const service = new SacService();
    const response = await service.createSac(req.body);
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }
  async getSac(req, res) {
    const service = new SacService();
    const response = await service.getSac(req.body);
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }
  async getAllSac(req, res) {
    const service = new SacService();
    const response = await service.getAllSac(req.body);
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }
}
