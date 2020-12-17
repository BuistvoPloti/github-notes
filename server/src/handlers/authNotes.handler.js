const { resolveServicePath } = require("../utils/helpers");

const notesService = require(resolveServicePath("notes"));

const {
  handleSuccessResponse,
  handleErrorResponse,
  validateQueryData,
} = require("../utils/response-helpers");
const {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
} = require("./notes.handler");

const getAuthNotes = (req, res, next) => {
  notesService
    .getAuthNotes(
      req.session.login,
      req.session.login,
      req.signedCookies.access_token
    )
    .then((notes) => {
      handleSuccessResponse({ notes }, res);
    })
    .catch((err) => {
      handleErrorResponse(res, err);
      next(err);
    });
};

const getAuthNoteById = (req, res, next) => {
  notesService
    .getNoteByIdAuth(
      req.params.id,
      req.session.login,
      req.signedCookies.access_token
    )
    .then((note) => {
      validateQueryData(note);
      return note;
    })
    .then(note => handleSuccessResponse({ note }, res))
    .catch((err) => {
      handleErrorResponse(res, err);
      next(err);
    });
};

module.exports = {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
  getAuthNotes,
  getAuthNoteById,
};
