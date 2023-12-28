import { Router } from "express";

import SacController from "../../resources/sac/sac.controllers.js";
import auth from '../../middlewares/auth.js'

const service = new SacController();
const sacRouter = Router();

sacRouter.post("/create", auth, service.createSac);
sacRouter.get("/all", auth, service.getAllSac);
sacRouter.get("/", auth, service.getSac);

export default sacRouter;