import { Request } from "express";

export type UserDecoded = {
  id: string;
  email: string;
};

export interface RequestWithUserRole extends Request {
  user?: UserDecoded;
}
