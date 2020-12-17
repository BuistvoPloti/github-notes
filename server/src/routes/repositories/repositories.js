const router = require("express").Router();
const repositories = require("../../handlers/repositories.handler");

router
  .route("/")
  .get(repositories.getRepositories)
  .post(repositories.createRepository);

/*  .get(repositories.getRepositoriesPG)
  .post(repositories.createRepositoryPG); */

router
  .route("/:id")
  .get(repositories.getRepositoryById)
  .delete(repositories.deleteRepository)
  .put(repositories.updateRepository);

/* .get(repositories.getRepositoryByIdPG)
  .put(repositories.updateRepositoryPG)
  .delete(repositories.deleteRepositoryPG); */

module.exports = router;
