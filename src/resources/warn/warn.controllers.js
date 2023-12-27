import { sendError } from "../../app.js";

import WarnService from "./warn.service.js";

export default class warnController {
  async createWarn(req, res) {
    const service = new WarnService();
    const response = await service.createWarn(req.body);
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }
  async updateWarn(req, res) {
    const service = new WarnService();
    const response = await service.updateWarn(req.body);
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }
  async deleteWarn(req, res) {
    const service = new WarnService();
    const response = await service.deleteWarn(req.body);
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }
  async getWarn(req, res) {
    const service = new WarnService();
    const response = await service.getWarn(req.body);
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }
  async getAllWarns(req, res) {
    const service = new WarnService();
    const response = await service.getAllWarns(req.body);
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }
}
