import { get, getDatabase, ref, update, set, remove } from "firebase/database";

import sendError from "../../utils/error";

export default class ClassService {
  async createWarn(warn, res: Response) {
    const { classID } = warn;
    const database = getDatabase();
    var amount = await get(ref(database, `class/${classID}/warns/amount`)).then(
      (x) => x.val()
    );
    if (!amount) amount = 0;
    delete warn.classID;
    warn = { ...warn, id: amount + 1 };
    const reference = ref(database, `class/${classID}/warns/${warn.id}`);
    await set(reference, warn);
    await update(ref(database, `class/${classID}/warns`), { amount: warn.id });

    return {
      status: 201,
      id: warn.id,
    };
  }

  async deleteWarn(classID, id, res: Response) {
    const database = getDatabase();
    const reference = ref(database, `class/${classID}/warns/${id}`);
    const data = await get(reference).then(async (snapshot) => {
      if (snapshot.exists()) return snapshot.val();
    });
    if (!data) return sendError(res, "message_does_not_exist");
    await remove(reference);
  }

  async editWarn(classID, id, text, res) {
    const database = getDatabase();
    const reference = ref(database, `class/${classID}/warns/${id}`);
    const data = await get(reference).then(async (snapshot) => {
      if (snapshot.exists()) return snapshot.val();
    });
    if (!data) return sendError(res, "message_does_not_exist");
    data.text = text;
    data.edited = true;
    update(reference, data);
  }

  async warns(classID, start, res) {
    const database = getDatabase();

    var warns = await get(ref(database, `class/${classID}/warns`)).then((x) =>
      x.val()
    );
    if (!warns) return sendError(res, "warns_unavailable");
    if (!start || start < 0) start = 0;
    warns = Object.values(warns);
    start = Number(start);
    var warnsList = [];

    await warns.forEach((x, i) => {
      if (!(parseInt(i) < start || parseInt(i) >= start + 10)) {
        if (typeof x == "object") warnsList.push(x);
      }
    });

    return {
      start,
      end: start + warnsList.length,
      amount: warnsList.length,
      warns: warnsList,
    };
  }

  async schedules(classID, res) {
    const database = getDatabase();
    const reference = ref(database, `class/${classID}/schedule`);
    const data = await get(reference).then(async (snapshot) => {
      if (snapshot.exists()) return snapshot.val();
    });
    if (!data) return sendError(res, "schedule_unavailable");

    return data;
  }

  async updateSchedules(classID, schedule, res) {
    const database = getDatabase();
    const reference = ref(database, `class/${classID}/schedule`);
    await update(reference, schedule);
  }

  async students(classID, res) {
    const database = getDatabase();
    const reference = ref(database, `class/${classID}/students`);
    const data = await get(reference).then(async (snapshot) => {
      if (snapshot.exists()) return snapshot.val();
    });
    if (!data) return sendError(res, "students_unavailable");
    return data.filter((x) => x != null);
  }

  async teachers(classID, res) {
    const database = getDatabase();
    const reference = ref(database, `class/${classID}/teachers`);
    const data = await get(reference).then(async (snapshot) => {
      if (snapshot.exists()) return snapshot.val();
    });
    if (!data) return sendError(res, "teachers_unavailable");

    return data.filter((x) => x != null);
  }
  async getInformations(classID, res) {
    const database = getDatabase();
    const reference = ref(database, `class/${classID}`);
    const data = await get(reference).then(async (snapshot) => {
      if (snapshot.exists()) return snapshot.val();
    });
    if (!data) return sendError(res, "class_unavailable");

    delete data?.warns;
    delete data?.schedule;
    return data;
  }
}
