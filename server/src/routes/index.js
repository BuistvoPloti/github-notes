const router = require("express").Router();
const repositories = require("./repositories/repositories");
const notes = require("./notes/notes");
const authNotes = require("./notes/authNotes");
const github = require("./github/github");

router.use("/api/public/repositories", repositories);
router.use("/api/public/notes", notes);
router.use("/api/notes", authNotes);
router.use("/api/github", github);

// add other routes here

module.exports = router;
