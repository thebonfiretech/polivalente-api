import { Request, Response } from "express";
import { RequestWithUserRole } from "src/config/userRequestType";
import StatisticsService from "./statistics.service";

export default class StatisticsController {

    async avaliation(req: RequestWithUserRole, res: Response){
        const userId = req?.user?.id;
        const avaliation = req.body
        const statisticsService = new StatisticsService()
        await statisticsService.avaliation(userId, avaliation, res)
        return res.sendStatus(201)
     }

    async chat(req: RequestWithUserRole, res: Response){
        const userId = req?.user?.id;
        const avaliation = req.body
        const statisticsService = new StatisticsService()
        await statisticsService.avaliation(userId, avaliation, res)
        return res.sendStatus(201)
     }



}