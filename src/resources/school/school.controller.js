import SchoolService from "./school.service.js";

//type shiftType = "afternoon" | "morning" | "night";

export default class SchoolController {
  async menu(req, res) {
    const { shift } = req.params;
    const schoolService = new SchoolService();
    const menu = await schoolService.menu(shift, res);
    return res.status(200).json({ menu });
  }

  async refreshMenu(req, res) {
    const { shift } = req.params;
    const menu = req.body;
    const schoolService = new SchoolService();
    await schoolService.refreshMenu(shift, menu, res);
    return res.sendStatus(201);
  }

  async createWarn(req, res) {
    const warn = req.body;
    const schoolService = new SchoolService();
    const warnStatus = await schoolService.createWarn(warn, res);
    return res.status(201).json({ warnStatus });
  }

  async deleteWarn(req, res) {
    const { id } = req.params;
    const schoolService = new SchoolService();
    await schoolService.deleteWarn(id, res);
    return res.sendStatus(200);
  }

  async editWarn(req, res) {
    const { id } = req.params;
    const { text } = req.body;
    const schoolService = new SchoolService();
    await schoolService.editWarn(id, text, res);
    return res.sendStatus(200);
  }

  async warns(req, res) {
    const { start } = req.query;
    const schoolService = new SchoolService();
    const warns = await schoolService.warns(start, res);
    return res.status(200).json({ warns });
  }

  async createDate(req, res) {
    const date = req.body;
    const schoolService = new SchoolService();
    const dateStatus = await schoolService.createDate(date, res);
    return res.status(201).json({ dateStatus });
  }

  async deleteDate(req, res) {
    const { id } = req.params;
    const schoolService = new SchoolService();
    await schoolService.deleteDate(id, res);
    return res.sendStatus(200);
  }

  async calendary(req, res) {
    const { start } = req.query;
    const schoolService = new SchoolService();
    const calendary = await schoolService.calendary(start, res);
    return res.status(200).json({ calendary });
  }
}
