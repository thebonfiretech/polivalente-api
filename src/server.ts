import chalk from "chalk";

import sendError from './utils/error'
import { connectToDatabase } from "./database/createConnection";
import logger from "./utils/logger";
import { app } from "./app";

const PORT = process.env.PORT || 3000;

const database = connectToDatabase();
if (database.status == 'unsuccessful connection') logger.error("unsuccessful database connection");

const server = app.listen(PORT, async () => {
  logger.info(`🚀 server started on ${chalk.yellowBright.underline("https://localhost:" + PORT)}.`);
});

process.on("SIGINT", () => {
  server.close();
  logger.warning("finished application");
});
