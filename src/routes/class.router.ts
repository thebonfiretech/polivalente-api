import { Router } from "express";

import ClassController from "../resources/class/class.controller";

const classController = new ClassController();

const classRouter = Router();

classRouter.delete("/warn/:classid/:id", classController.deleteWarn);
classRouter.put("/warn/:classid/:id", classController.editWarn);
classRouter.post("/warn", classController.createWarn);
classRouter.get("/warns/:classid", classController.warns);

classRouter.put("/schedules/:classid", classController.updateSchedules);
classRouter.get("/schedules/:classid", classController.schedules);

classRouter.get("/students/:classid", classController.students);
classRouter.get("/teachers/:classid", classController.teachers);
classRouter.get("/:classid", classController.getInformations);

export default classRouter;
