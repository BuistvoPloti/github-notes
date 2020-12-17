const { resolveServicePath } = require("../utils/helpers");

const repositoriesService = require(resolveServicePath("repositories"));

const {
  handleSuccessResponse,
  handleErrorResponse,
  validateQueryData,
  isRequestBodyError,
} = require("../utils/response-helpers");

const getRepositories = (req, res, next) => {
  repositoriesService
    .getRepositories()
    .then((repositories) => {
      handleSuccessResponse({ repositories }, res);
    })
    .catch((err) => {
      handleErrorResponse(res, err);
      next(err);
    });
};

const getRepositoryById = (req, res, next) => {
  repositoriesService
    .getRepositoryById(req.params.id)
    .then((repository) => {
      validateQueryData(repository);
      return repository;
    })
    .then(repository => handleSuccessResponse({ repository }, res))
    .catch((err) => {
      handleErrorResponse(res, err);
      next(err);
    });
};

const createRepository = (req, res, next) => {
  if (isRequestBodyError(req.body, res, next)) {
    return;
  }

  const repositoryBody = {
    name: req.body.name,
    description: req.body.description,
    stars: req.body.stars,
    creator_name: req.body.creator_name,
    created_at: new Date(),
  };

  repositoriesService
    .createRepository(repositoryBody)
    .then(repository => handleSuccessResponse({ repository }, res, 201))
    .catch((err) => {
      handleErrorResponse(res, err);
      next(err);
    });
};

const updateRepository = (req, res, next) => {
  if (isRequestBodyError(req.body, res, next)) {
    return;
  }

  const newRepositoryBody = {
    name: req.body.name,
    description: req.body.description,
    stars: req.body.stars,
    creator_name: req.body.creator_name,
  };

  repositoriesService
    .updateRepository(req.params.id, newRepositoryBody)
    .then((repository) => {
      validateQueryData(repository);
      return repository;
    })
    .then(repository => handleSuccessResponse({ repository }, res))
    .catch((err) => {
      handleErrorResponse(res, err);
      next(err);
    });
};

const deleteRepository = (req, res, next) => {
  repositoriesService
    .deleteRepository(req.params.id)
    .then((repository) => {
      validateQueryData(repository);
      return repository;
    })
    .then(() => handleSuccessResponse(null, res, 202))
    .catch((err) => {
      handleErrorResponse(res, err);
      next(err);
    });
};

module.exports = {
  getRepositories,
  createRepository,
  getRepositoryById,
  updateRepository,
  deleteRepository,
};
