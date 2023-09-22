import { Request } from 'express';
import { User } from '@interfaces/users.interface';
import * as core from 'express-serve-static-core';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser<P = core.ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = core.Query>
  extends Request<P, ResBody, ReqBody, ReqQuery> {
  user: User;
}
