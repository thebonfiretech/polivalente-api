import { Router } from "express";

import usersController from "../../resources/users/users.controllers.js";
import auth from '../../middlewares/auth.js'

const service = new usersController();
const usersRouter = Router();

usersRouter.put("/update-user",  auth, service.updateCurrentUser);
usersRouter.get("/get-user", auth, service.getCurrentUser);
usersRouter.post("/signin", service.signIn);
usersRouter.post("/signup", service.signUp);

usersRouter.post("/admin/create-user", service.createUser);
usersRouter.put("/admin/update-user", service.updateUser);
usersRouter.get("/admin/get-user",  service.getUserById);
usersRouter.get("/admin/teachers", service.getTeachers);
usersRouter.get("/admin/", service.getUsers);

export default usersRouter;