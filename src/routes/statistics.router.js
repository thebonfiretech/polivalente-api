import { Router } from 'express';

import StatisticsController from '../resources/statistics/statistics.controller.js';
import userAuthenticad from '../middlewares/userAuthenticad.js';

const statisticsController = new StatisticsController();
const statisticsRouter = Router();

statisticsRouter.post("/avaliation", userAuthenticad, statisticsController.avaliation);
statisticsRouter.post("/chat", userAuthenticad , statisticsController.chat)

export default statisticsRouter

