import { Router } from "express";

import MenuController from "../../resources/menu/menu.controllers.js";
import auth from '../../middlewares/auth.js'

const service = new MenuController();
const menuRouter = Router();

menuRouter.put("/update", auth, service.updateMenu);
menuRouter.get("/", auth, service.getMenu);

export default menuRouter;