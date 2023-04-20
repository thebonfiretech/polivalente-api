import { getDatabase, ref, get, update } from "firebase/database";
import { sign } from "jsonwebtoken";
import { Response } from "express";
import md5 from "crypto-js/md5";

import { userSignIn, userSignUp, teacherClasses, teacherData} from "./dtos/teacher.dtos";
import authConfig from "src/config/auth";
import sendError from "../../utils/error";

export default class UserService {
  async signIn(user: userSignIn, res: Response) {
    const { email, password } = user;

    const database = getDatabase();
    const reference = ref(database, "school/teachers");
    const teachers = await get(reference).then((x) => ({
      data: x.val(),
      size: x.size,
    }));
    var userFind = teachers.data.find((x) => x?.email == email);
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
    const reference = ref(database, "school/teachers");
    const teachers = await get(reference).then((x) => ({
      data: x.val(),
      size: x.size,
    }));
    var userFind = teachers.data.find((x) => x?.name == name);
  
    if (!userFind) return sendError(res, "unauthorized_user");
    if (userFind?.registered) return sendError(res, "user_already_registered");
    if (userFind?.desatived) return sendError(res, "user_already_registered");
    const id = teachers.size + 1;
    const data: teacherData = {
      password: md5(password).toString(),
      shift: userFind.shift,
      classes: userFind.classes,
      registered: true,
      desatived: false,
      historic: [],
      permissions,
      email,
      name,
      id: userFind.id,
    };


    await update(ref(database, "school/teachers/" + data.id), data);

    Object.values(userFind?.classes).forEach(async (x: teacherClasses ,i) => {
      await update(ref(database, `class/${x.classID}/teachers/` + data.id), {
        teacherID: data.id,
        name: data.name,
        matter: x.matter
      });
    })

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign(data, authConfig.jwt.secret, { expiresIn });
    return { acessToken: token };
  }

  async me(user, res: Response) {
    const { id } = user;
    const database = getDatabase();
    const reference = ref(database, "school/teachers/" + id);
    const currentUser = await get(reference).then((snapshot) => {
      if (!snapshot.exists()) return sendError(res, "user_not_found");
      return snapshot.val();
    });

    delete currentUser.password;

    return currentUser;
  }

  async historic(res: Response) {}
}
