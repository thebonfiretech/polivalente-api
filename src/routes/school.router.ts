import { Router } from "express";

import SchoolController from "@resources/school/school.controller";

const schoolController = new SchoolController();
const schoolRouter = Router();

schoolRouter.delete("/warn/:id", schoolController.deleteWarn);
schoolRouter.put("/warn/:id", schoolController.editWarn);
schoolRouter.post("/warn", schoolController.createWarn);
schoolRouter.get("/warns", schoolController.warns);

schoolRouter.delete("/calendary/:id", schoolController.deleteDate);
schoolRouter.post("/calendary", schoolController.createDate);
schoolRouter.get("/calendary", schoolController.calendary);

schoolRouter.post("/menu/:shift", schoolController.refreshMenu);
schoolRouter.get("/menu/:shift", schoolController.menu);

export default schoolRouter;
