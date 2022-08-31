
export interface userSignIn {
  email: string;
  password: string;
}

export interface userSignUp {
  email: string;
  password: string;
  name: string;
  permissions: object;
}

export interface teacherClasses{
  classID: string;
  matter: string;
  name: string;
 }

export interface teacherData {
  password: string,
  shift: object,
  classes: Array<teacherClasses>,
  registered: boolean,
  desatived: boolean,
  historic: object,
  permissions: object,
  email: string,
  name: string,
  id: string,
};
