import { Errback, NextFunction, Request, Response } from "express";

export type ExtendedRequest = {
  session: any;
} & Request;
export type ReqResNextTypes = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => void;
export type ErrReqResNextTypes = ReqResNextTypes extends (...params: infer U) => infer R ?
  (err: Errback & { message: string }, ...params:U) => R: never;
export type Owner = {
  id: number,
  login: string,
}
export interface IRepository {
  _id?: string | number,
  id?: string | number,
  name: string,
  description: string | null,
  stars: string | number,
  creator_name: string,
  created_at: string | Date,
  stargazers_count?: number,
  owner?: Owner,
  starred?: boolean,
  fork?: boolean,
}
export interface INote {
  _id?: string | number,
  id?: string | number,
  creator_id: string | null,
  repository_id: string | number,
  text: string,
  created_at: string | Date,
  related_repository?: [
    {
      name: string,
      id: string | number,
      created_at?: string | Date,
    }
  ]
}
export interface IUser {
  _id?: string,
  id?: string | number,
  user_id: string | number,
  login: string,
}
