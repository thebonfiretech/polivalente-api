import { Router } from "express";

import WarnController from "../../resources/warn/warn.controllers.js";
import auth from '../../middlewares/auth.js'

const service = new WarnController();
const warnRouter = Router();

warnRouter.delete("/delete", auth, service.deleteWarn);
warnRouter.post("/create", auth, service.createWarn);
warnRouter.put("/update", auth, service.updateWarn);
warnRouter.get("/all", auth, service.getAllWarns);
warnRouter.get("/", auth, service.getWarn);

export default warnRouter;