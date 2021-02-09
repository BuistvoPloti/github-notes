import * as express from "express";

import * as notes from "../../handlers/notes.handler";

const router = express.Router();

router
  .route("/")
  .get(notes.getNotes)
  .post(notes.createNote);

router
  .route("/:id")
  .get(notes.getNoteById)
  .put(notes.updateNote)
  .delete(notes.deleteNote);

export { router as notes };
