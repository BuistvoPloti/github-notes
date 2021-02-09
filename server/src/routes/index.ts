import * as express from "express";
import { repositories } from "./repositories/repositories";
import { notes } from "./notes/notes";
import { authNotes } from "./notes/auth-notes";
import { github } from "./github/github";

const router = express.Router();

router.use("/api/public/repositories", repositories);
router.use("/api/public/notes", notes);
router.use("/api/notes", authNotes);
router.use("/api/github", github);

export { router };
