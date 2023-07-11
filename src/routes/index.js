import { Router } from "express";

import statisticsRouter from "./statistics.router.js";
import schoolRouter from "./school.router.js";
import classRouter from "./class.router.js";
import userRouter from "./user.router.js";

export const router = Router();

router.get("/ping", (req, res) => {
  res.sendStatus(200);
});

router.use("/statistics", statisticsRouter);
router.use("/school", schoolRouter);
router.use("/class", classRouter);
router.use("/user", userRouter);
