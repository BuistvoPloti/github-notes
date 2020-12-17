const router = require("express").Router();
const authNotes = require("../../handlers/authNotes.handler");

router
  .route("/")
  .get(authNotes.getAuthNotes)
  .post(authNotes.createNote);

router
  .route("/:id")
  .get(authNotes.getAuthNoteById)
  .put(authNotes.updateNote)
  .delete(authNotes.deleteNote);

module.exports = router;
