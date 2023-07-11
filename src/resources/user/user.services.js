import { getDatabase, ref, get, update } from "firebase/database";
import jwt from "jsonwebtoken";
import crypto from "crypto-js";


import authConfig from "../../config/auth.js";
import sendError from "../../utils/error.js";

export default class UserService {
  async signIn(user, res) {
    const { email, password } = user;
    const database = getDatabase();
    const reference = ref(database, "users/");
    const users = await get(reference).then((x) => ({
      data: x.val()
    }));
    var userFind = users.data.find((x) => x?.email == email);
    if (!userFind || !userFind.password) return sendError(res, "user_not_found");
    const hashPassword = crypto.MD5(password).toString();
    if (hashPassword !== userFind.password) return sendError(res, "incorrect_password");
    const { secret, expiresIn } = authConfig.jwt;
    const token = jwt.sign(userFind, secret, { expiresIn });
    return { acessToken: token };
  }

  async signUp(user, res) {
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
      password: crypto.MD5(password).toString(),
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
    const token = jwt.sign(data, secret, { expiresIn });
    return { acessToken: token };
  }

  async me(user, res) {
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
