import { Request, Response } from "express";

import ClassService from "./class.service";

export default class ClassController {
  async createWarn(req: Request, res) {
    const warn = req.body;
    const classService = new ClassService();
    const warnStatus = await classService.createWarn(warn, res);
    return res.status(201).json({ id: warnStatus.id });
  }

  async deleteWarn(req: Request, res) {
    const { id, classid } = req.params;
    const classService = new ClassService();
    await classService.deleteWarn(classid, id, res);
    return res.sendStatus(200);
  }

  async editWarn(req: Request, res: Response) {
    const { id, classid } = req.params;
    const { text } = req.body;
    const classService = new ClassService();
    await classService.editWarn(classid, id, text, res);
    return res.sendStatus(200);
  }

  async warns(req: Request, res: Response) {
    const { classid } = req.params;
    const { start } = req.query;
    const classService = new ClassService();
    const warns = await classService.warns(classid, start, res);
    return res.status(200).json(warns);
  }

  async schedules(req: Request, res: Response) {
    const { classid } = req.params;
    const classService = new ClassService();
    const schedule = await classService.schedules(classid, res);
    if (schedule) return res.status(200).json({ schedule });
  }

  async updateSchedules(req: Request, res: Response) {
    const { classid } = req.params;
    const schedule = req.body;
    const classService = new ClassService();
    await classService.updateSchedules(classid, schedule, res);
    return res.sendStatus(201);
  }

  async students(req: Request, res: Response) {
    const { classid } = req.params;
    const classService = new ClassService();
    const students = await classService.students(classid, res);
    return res.status(200).json({ students });
  }

  async teachers(req: Request, res: Response) {
    const { classid } = req.params;
    const classService = new ClassService();
    const teachers = await classService.teachers(classid, res);
    return res.status(200).json({ teachers });
  }
  async getInformations(req: Request, res: Response) {
    const { classid } = req.params;
    const classService = new ClassService();
    const informations = await classService.getInformations(classid, res);
    return res.status(200).json({ informations });
  }
}
