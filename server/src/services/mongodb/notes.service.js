const fp = require("lodash/fp");
const Note = require("../../models/mongodb/note");
const githubService = require("../common/github.service");

const {
  findRepoIdMatch,
  excludeMongoVariables,
} = require("../../utils/lodash.utils");

const getNoteById = noteId => Note.findById(noteId).populate("related_repository", "name");

const getNoteByIdAuth = (noteId, login, accessToken) => {
  const leanNote = Note.findById(noteId, null, { lean: true });
  const userRepositoriesPromise = githubService.getUserRepositories(
    login,
    accessToken,
  );

  return Promise
    .all([leanNote, userRepositoriesPromise])
    .then((composedData) => {
      const [note, userRepositories] = composedData;
      const repoIdMatch = findRepoIdMatch(note.repository_id, userRepositories);
      const extraData = {
        related_repository: [{ name: repoIdMatch.name, id: repoIdMatch.id }],
        id: note._id,
      };

      return fp.pipe(
        excludeMongoVariables,
        it => fp.merge(it, extraData)
      )(note);
    });
};

const getNotes = () => Note.find()
  .where("creator_id")
  .equals(null)
  .populate("related_repository", "name");

const getAuthNotes = (creatorLogin, login, accessToken) => {
  const leanNotes = Note.find({ creator_id: creatorLogin }, null, {
    lean: true,
  });
  const userRepositoriesPromise = githubService.getUserRepositories(
    login,
    accessToken,
  );

  return Promise
    .all([leanNotes, userRepositoriesPromise])
    .then((composedData) => {
      const [notes, userRepositories] = composedData;

      return notes.map((note) => {
        const repoIdMatch = findRepoIdMatch(note.repository_id, userRepositories);
        const extraData = {
          related_repository: [{ name: repoIdMatch.name, id: repoIdMatch.id }],
          id: note._id,
        };

        return fp.pipe(
          excludeMongoVariables,
          it => fp.merge(it, extraData)
        )(note);
      });
    });
};

const deleteNote = noteId => Note.findOneAndDelete({ _id: noteId });

const updateNote = (noteId, newNoteBody) => Note.findOneAndUpdate({ _id: noteId }, newNoteBody, { new: true });

const createNote = noteBody => Promise.resolve()
  .then(() => new Note(noteBody))
  .then(note => note.save());

module.exports = {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
  getAuthNotes,
  getNoteByIdAuth,
};
