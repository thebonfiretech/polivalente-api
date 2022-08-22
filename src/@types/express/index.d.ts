import {UserDecoded} from 'src/config/userRequestType';
import {Request} from "express";

declare global{
  namespace Express {
      interface Request {
          user?: UserDecoded
      }
  }
}