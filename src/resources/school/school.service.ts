import { getDatabase, ref, get, update, set, remove } from "firebase/database";
import { Response } from "express";

import sendError from "@utils/error";

interface menuConfig {
  drink: string;
  fruit: string;
  food: string;
  date: string;
}

interface warnTypes {
  id: number;
  text: string;
  permissions: object;
  edited: boolean;
  date: Date;
  authorId: Number;
  authorDisplayURL: string;
}

export default class SchoolService {
  async menu(shift: string, res: Response) {
    const database = getDatabase();
    const reference = ref(database, "school/menu/" + shift);
    const data = await get(reference).then(async (snapshot) => {
      if (snapshot.exists()) return snapshot.val();
    });
    if (!data) return sendError(res, "menu_unavailable");
    return data;
  }

  async refreshMenu(shift: string, menu: menuConfig, res: Response) {
    const database = getDatabase();
    const reference = ref(database, "school/menu/" + shift);
    await update(reference, menu);
  }

  async createWarn(warn, res: Response) {
    const database = getDatabase();
    var amount = await get(ref(database, "school/warns/amount")).then((x) =>
      x.val()
    );
    if (!amount) amount = 0;
    warn = { ...warn, id: amount + 1 };
    const reference = ref(database, "school/warns/" + warn.id);
    await set(reference, warn);
    await update(ref(database, "school/warns"), { amount: warn.id });

    return {
      status: 201,
      id: warn.id,
    };
  }

  async deleteWarn(id, res: Response) {
    const database = getDatabase();
    const reference = ref(database, "school/warns/" + id);
    const data = await get(reference).then(async (snapshot) => {
      if (snapshot.exists()) return snapshot.val();
    });
    if (!data) return sendError(res, "message_does_not_exist");
    await remove(reference);
  }

  async editWarn(id, text, res: Response) {
    const database = getDatabase();
    const reference = ref(database, "school/warns/" + id);
    const data = await get(reference).then(async (snapshot) => {
      if (snapshot.exists()) return snapshot.val();
    });
    if (!data) return sendError(res, "message_does_not_exist");
    data.text = text;
    data.edited = true;
    update(reference, data);
  }

  async warns(start, res) {
    const database = getDatabase();

    var warns = await get(ref(database, "school/warns")).then((x) => x.val());
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
  async createDate(date, res: Response) {
    const database = getDatabase();
    var amount = await get(ref(database, "school/calendary/amount")).then((x) =>
      x.val()
    );
    if (!amount) amount = 0;
    date = { ...date, id: amount + 1 };
    const reference = ref(database, "school/calendary/" + date.id);
    await set(reference, date);
    await update(ref(database, "school/calendary"), { amount: date.id });

    return {
      status: 201,
      id: date.id,
    };
  }

  async deleteDate(id, res: Response) {
    const database = getDatabase();
    const reference = ref(database, "school/calendary/" + id);
    const data = await get(reference).then(async (snapshot) => {
      if (snapshot.exists()) return snapshot.val();
    });
    if (!data) return sendError(res, "date_does_not_exist");
    await remove(reference);
  }

  async calendary(start, res) {
    const database = getDatabase();

    var calendary = await get(ref(database, "school/calendary")).then((x) =>
      x.val()
    );
    if (!calendary) return sendError(res, "calendary_unavailable");
    if (!start || start < 0) start = 0;
    calendary = Object.values(calendary);
    start = Number(start);
    var calendaryList = [];

    await calendary.forEach((x, i) => {
      if (!(parseInt(i) < start || parseInt(i) >= start + 10)) {
        if (typeof x == "object") calendaryList.push(x);
      }
    });

    return {
      start,
      end: start + calendaryList.length,
      amount: calendaryList.length,
      calendary: calendaryList,
    };
  }
}
