import { Router } from "express";

import usersController from "../../resources/users/users.controllers.js";
import auth from '../../middlewares/auth.js'

const service = new usersController();
const usersRouter = Router();

usersRouter.post("/get-current-user", auth, service.getUser);
usersRouter.put("/update-user", auth, service.signUp);
usersRouter.post("/signin", service.signIn);
usersRouter.get("/signup", service.signUp);

usersRouter.put("/update-current-user", auth,  service.updateCurrentUser);
usersRouter.post("/create-user", auth, service.createUser);
usersRouter.post("/get-user", auth,  service.getUserById);
usersRouter.get("/teachers", auth, service.getTeachers);
usersRouter.get("/", auth, service.getUsers);

export default usersRouter;