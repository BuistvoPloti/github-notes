const router = require("express").Router();
const github = require("../../handlers/github.handler");
const { authProtection } = require("../../middlewares/auth");

router.route("/authorize/callback").get(github.authorizeGithubUser);
router
  .route("/repositories/:user/:id")
  .get(authProtection, github.getUserRepository);
router.route("/repositories").get(authProtection, github.getUserRepositories);
router.route("/user").get(authProtection, github.getUser);
router.route("/logout").delete(authProtection, github.logoutGithubUser);

module.exports = router;
