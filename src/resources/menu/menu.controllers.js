import { sendError } from "../../app.js";

import MenuService from "./menu.service.js";

export default class menuController {
  async getMenu(req, res) {
    const service = new MenuService();
    const response = await service.getMenu(req.body);
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }
  async updateMenu(req, res) {
    const service = new MenuService();
    const response = await service.updateMenu(req.body);
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }

}
