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
    const reference = ref(database, "users/");
    const users = await get(reference).then((x) => ({
      data: x.val()
    }));
    var userFind = users.data.find((x) => x?.email == email);
    if (!userFind || !userFind.password) return sendError(res, "user_not_found");
    const hashPassword = md5(password).toString();
    if (hashPassword !== userFind.password) return sendError(res, "incorrect_password");
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign(userFind, secret, { expiresIn });
    return { acessToken: token };
  }

  async signUp(user: userSignUp, res: Response) {
    const { name, email, password } = user;

    const changeName = (name) => name?.toLowerCase().replace(/\s+/g, '');

    const database = getDatabase();
    const reference = ref(database, "users/");
    const users = await get(reference).then((x) => ({
      data: x.val(),
      size: x.size,
    }));
    var userFind = users.data.find((x) => changeName(x?.name) == changeName(name));

    if (!userFind) return sendError(res, "unauthorized_user");
    if (userFind?.registered) return sendError(res, "user_already_registered");
    if (userFind?.desatived) return sendError(res, "user_already_registered");
    const id = users.size + 1;

    const data = {
      password: md5(password).toString(),
      roles: userFind?.roles ? userFind.roles : [],
      shift: userFind.shift,
      class: userFind.class,
      registered: true,
      desatived: false,     
      id: userFind.id,
      email,
      name,
    };
    await update(ref(database, "users/" + data.id), data);

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign(data, secret, { expiresIn });
    return { acessToken: token };
  }

  async me(user, res: Response) {
    const { id } = user;
    const database = getDatabase();
    const reference = ref(database, "users/" + id);
    const currentUser = await get(reference).then((snapshot) => {
      if (!snapshot.exists()) return sendError(res, "user_not_found");
      return snapshot.val();
    });

    delete currentUser.password;

    return currentUser;
  }


}
