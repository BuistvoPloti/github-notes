const router = require("express").Router();
const notes = require("../../handlers/notes.handler");

router
  .route("/")
  .get(notes.getNotes)
  .post(notes.createNote);

router
  .route("/:id")
  .get(notes.getNoteById)
  .put(notes.updateNote)
  .delete(notes.deleteNote);

module.exports = router;
