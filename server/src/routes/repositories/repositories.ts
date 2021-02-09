import * as express from "express";
import * as repositories from "../../handlers/repositories.handler";

const router = express.Router();
router
  .route("/")
  .get(repositories.getRepositories)
  .post(repositories.createRepository);

router
  .route("/:id")
  .get(repositories.getRepositoryById)
  .delete(repositories.deleteRepository)
  .put(repositories.updateRepository);

export { router as repositories };
