import * as express from "express";
import * as authNotes from "../../handlers/auth-notes.handler";

const router = express.Router();

router
  .route("/")
  .get(authNotes.getAuthNotes)
  .post(authNotes.createNote);

router
  .route("/:id")
  .get(authNotes.getAuthNoteById)
  .put(authNotes.updateNote)
  .delete(authNotes.deleteNote);

export { router as authNotes };
