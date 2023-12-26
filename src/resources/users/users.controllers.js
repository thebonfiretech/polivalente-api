import { sendError } from "../../app.js";

import UsersService from "./users.service.js";

export default class usersController {
  async signUp(req, res) {
    var { name, email, password} = req.body;
    const service = new UsersService();
    const response = await service.signUp(name, email, password);
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }
}
