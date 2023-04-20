import { Router } from 'express';

import StatisticsController from '../resources/statistics/statistics.controller';
import userAuthenticad from '../middlewares/userAuthenticad';

const statisticsController = new StatisticsController();
const statisticsRouter = Router();

statisticsRouter.post("/avaliation", userAuthenticad, statisticsController.avaliation);
statisticsRouter.post("/chat", userAuthenticad , statisticsController.chat)

export default statisticsRouter

