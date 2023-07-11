import StatisticsService from "./statistics.service.js";

export default class StatisticsController {

    async avaliation(req, res){
        const userId = req?.user?.id;
        const avaliation = req.body
        const statisticsService = new StatisticsService()
        await statisticsService.avaliation(userId, avaliation, res)
        return res.sendStatus(201)
     }

    async chat(req, res){
        const userId = req?.user?.id;
        const avaliation = req.body
        const statisticsService = new StatisticsService()
        await statisticsService.avaliation(userId, avaliation, res)
        return res.sendStatus(201)
     }



}