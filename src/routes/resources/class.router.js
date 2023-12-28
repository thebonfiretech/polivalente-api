import { Router } from "express";

import ClassController from "../../resources/class/class.controllers.js";
import auth from '../../middlewares/auth.js'

const service = new ClassController();
const classRouter = Router();

classRouter.delete("/delete", auth, service.deleteClass);
classRouter.post("/create", auth, service.createClass);
classRouter.put("/update", auth, service.updateClass);
classRouter.get("/all", auth, service.getAllClasses);
classRouter.get("/", auth, service.getClass);

export default classRouter;