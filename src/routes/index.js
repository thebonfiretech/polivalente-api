import { Router } from "express";

import usersRouter from "./resources/users.router.js";
import classRouter from "./resources/class.router.js";
import warnRouter from './resources/warn.router.js';
import menuRouter from "./resources/menu.router.js";
import sacRouter from "./resources/sac.router.js";

export const router = Router();

router.get("/ping", (req, res) => {
  res.sendStatus(200);
});

router.use('/class', classRouter);
router.use('/user', usersRouter);
router.use('/warn', warnRouter);
router.use('/menu', menuRouter);
router.use('/sac', sacRouter);