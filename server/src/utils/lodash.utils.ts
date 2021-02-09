import * as fp from "lodash/fp";
import { IRepository } from "../types/types";

export const findRepoIdMatch = (
  repository_id: string | number,
  userRepositories: IRepository[]
): any => (
  fp.find(["id", Number(repository_id)], userRepositories)
);

export const excludeMongoVariables = (data: Record<string, unknown>): any => (
  fp.omit(["_id", "__v"], data)
);
