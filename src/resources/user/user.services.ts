import { getDatabase, ref, get, update } from "firebase/database";
import { sign } from "jsonwebtoken";
import { Response } from "express";
import md5 from "crypto-js/md5";

import { userSignIn, userSignUp } from "./dtos/user.dtos";
import authConfig from "src/config/auth";
import sendError from "@utils/error";

export default class UserService {
  async signIn(user: userSignIn, res: Response) {
    const { email, password } = user;

    const database = getDatabase();
    const reference = ref(database, "school/students");
    const students = await get(reference).then((x) => ({
      data: x.val(),
      size: x.size,
    }));
    var userFind = students.data.find((x) => x?.email == email);
    if (!userFind.password || !userFind)
      return sendError(res, "user_not_found");
    const hashPassword = md5(password).toString();
    if (hashPassword !== userFind.password)
      return sendError(res, "incorrect_password");

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign(userFind, authConfig.jwt.secret, { expiresIn });
    return { acessToken: token };
  }
  async signUp(user: userSignUp, res: Response) {
    const { name, email, password, permissions } = user;

    const database = getDatabase();
    const reference = ref(database, "school/students");
    const students = await get(reference).then((x) => ({
      data: x.val(),
      size: x.size,
    }));
    var userFind = students.data.find((x) => x?.name == name);

    if (!userFind) return sendError(res, "unauthorized_user");
    if (userFind?.registered) return sendError(res, "user_already_registered");
    if (userFind?.desatived) return sendError(res, "user_already_registered");
    const id = students.size + 1;

    const data = {
      password: md5(password).toString(),
      shift: userFind.shift,
      class: userFind.class,
      registered: true,
      desatived: false,
      reportCard: null,
      historic: [],
      permissions,
      email,
      name,
      id: userFind.id,
    };

    await update(ref(database, "school/students/" + data.id), data);

    const registeredRef = ref(database, "statistics/users/");
    var registered = await get(registeredRef).then((x) => x.val());
    update(registeredRef, { registered: registered.registered + 1 });

    const classRef = ref(database, "class/" + userFind.class + "/students");
    var classFind = await get(classRef).then((x) => ({
      data: x.val(),
      size: x.size,
    }));
    if (!classFind?.size) classFind.size = 0;
    update(
      ref(
        database,
        "class/" + userFind.class + "/students/" + (classFind.size + 1)
      ),
      {
        name,
        id,
      }
    );

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign(data, authConfig.jwt.secret, { expiresIn });
    return { acessToken: token };
  }

  async me(user, res: Response) {
    const { id } = user;
    const database = getDatabase();
    const reference = ref(database, "school/students/" + id);
    const currentUser = await get(reference).then((snapshot) => {
      if (!snapshot.exists()) return sendError(res, "user_not_found");
      return snapshot.val();
    });

    delete currentUser.password;

    return currentUser;
  }

  async reportCard(userId, res: Response) {
    const database = getDatabase();
    const user = await this.me({ id: userId }, res);
    const reference = ref(database, "school/reportCards/" + userId);
    const reportCard = await get(reference).then((x) => {
      if (!x.exists()) return sendError(res, "reportcard_unavailable");
      return x.val();
    });
    return reportCard;
  }
  async updateReportCard(reportCardInfo, res: Response) {
    const { userId, id, reportCard } = reportCardInfo;
    const database = getDatabase();
    const user = await this.me({ id: userId }, res);
    const reference = ref(database, `school/reportCards/${userId}/b${id}`);
    await update(reference, reportCard);
  }
  async historic(res: Response) {}
}
