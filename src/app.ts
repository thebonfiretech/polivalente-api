import dotenv from "dotenv";
dotenv.config();
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import { router } from "@routes/index";
import sendError from "./utils/error";

export const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/v1", router);

app.use((err, req, res) => {
  sendError(res, "internal_error");
  console.log(err);
});
