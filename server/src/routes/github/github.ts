import * as express from "express";
import { authProtection } from "../../middlewares/auth";
import * as github from "../../handlers/github.handler";

const router = express.Router();
router.route("/authorize/callback").get(github.authorizeGithubUser);
router
  .route("/repositories/:user/:id")
  .get(authProtection, github.getUserRepository);
router.route("/repositories").get(authProtection, github.getUserRepositories);
router.route("/user").get(authProtection, github.getUser);
router.route("/logout").delete(authProtection, github.logoutGithubUser);

export { router as github };
