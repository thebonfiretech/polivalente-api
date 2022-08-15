import { Router } from "express";

import statisticsRouter from "./statistics.router";
import schoolRouter from "./school.router";
import classRouter from "./class.router";
import userRouter from "./user.router";

export const router = Router();

router.get("/ping", (req, res) => {
  res.sendStatus(200);
});

router.use("/statistics", statisticsRouter);
router.use("/school", schoolRouter);
router.use("/class", classRouter);
router.use("/user", userRouter);
