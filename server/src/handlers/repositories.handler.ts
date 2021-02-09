import { IRepository, ReqResNextTypes } from "../types/types";

import {
  isReqBodyValid,
  handleErrorResponse,
  handleSuccessResponse,
  validateQueryData
} from "../utils/response-helpers";
import { services } from "../services/db-resolver.service";

const { repositoriesService } = services;

const getRepositories: ReqResNextTypes = async (_req, res, next) => {
  try {
    const repositories = await repositoriesService.getRepositories();
    return handleSuccessResponse({ repositories }, res);
  } catch (err) {
    handleErrorResponse(res, err);
    return next(err);
  }
};

const getRepositoryById: ReqResNextTypes = async (req, res, next) => {
  try {
    const repository = await repositoriesService.getRepositoryById(
      req.params.id
    );
    validateQueryData(repository);
    return handleSuccessResponse({ repository }, res);
  } catch (err) {
    handleErrorResponse(res, err);
    return next(err);
  }
};

const createRepository: ReqResNextTypes = async (req, res, next) => {
  const repositoryBody: IRepository = {
    name: req.body.name,
    description: req.body.description,
    stars: req.body.stars,
    creator_name: req.body.creator_name,
    created_at: new Date(),
  };
  if (!isReqBodyValid(repositoryBody)) {
    handleErrorResponse(res, {});
    return next({});
  }
  try {
    const repository = await repositoriesService.createRepository(
      repositoryBody
    );
    return handleSuccessResponse({ repository }, res, 201);
  } catch (err) {
    handleErrorResponse(res, err);
    return next(err);
  }
};

const updateRepository: ReqResNextTypes = async (req, res, next) => {
  const newRepositoryBody = {
    name: req.body.name,
    description: req.body.description,
    stars: req.body.stars,
    creator_name: req.body.creator_name,
  };
  if (!isReqBodyValid(newRepositoryBody)) {
    handleErrorResponse(res, {});
    return next({});
  }
  try {
    const updatedRepository = await repositoriesService.updateRepository(
      req.params.id,
      newRepositoryBody
    );
    validateQueryData(updatedRepository);
    return handleSuccessResponse({ updatedRepository }, res);
  } catch (err) {
    handleErrorResponse(res, err);
    return next(err);
  }
};

const deleteRepository: ReqResNextTypes = async (req, res, next) => {
  try {
    repositoriesService.deleteRepository(
      req.params.id
    );
    return handleSuccessResponse(null, res, 202);
  } catch (err) {
    handleErrorResponse(res, err);
    return next(err);
  }
};

export {
  getRepositories,
  createRepository,
  getRepositoryById,
  updateRepository,
  deleteRepository,
};
