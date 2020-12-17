const githubService = require("../common/github.service");
const { models } = require("../../models/postgresql");
const { transformNotes, transformSingleNote } = require("../../utils/helpers");

const Repository = models.repository;
const Note = models.note;

const getNoteById = (noteId) => {
  const leanNote = Note.findOne({
    where: {
      id: noteId
    },
    raw: true,
    nest: true,
  });

  const repositoriesPromise = Repository.findAll(
    {
      raw: true,
      nest: true
    }
  );

  return Promise
    .all([leanNote, repositoriesPromise])
    .then((composedData) => {
      const [note, repositories] = composedData;
      return transformSingleNote(note, repositories);
    });
};

const getNotes = () => {
  const leanNotes = Note.findAll({
    where: {
      creator_id: null
    },
    raw: true,
    nest: true,
  });

  const repositoriesPromise = Repository.findAll(
    {
      raw: true,
      nest: true
    }
  );

  return Promise
    .all([leanNotes, repositoriesPromise])
    .then((composedData) => {
      const [notes, repositories] = composedData;
      return transformNotes(notes, repositories);
    });
};

const getAuthNotes = (creatorLogin, login, accessToken) => {
  const leanNotes = Note.findAll({
    where: {
      creator_id: creatorLogin
    },
    raw: true,
    nest: true,
  });

  const userRepositoriesPromise = githubService.getUserRepositories(
    login,
    accessToken,
  );

  return Promise
    .all([leanNotes, userRepositoriesPromise])
    .then((composedData) => {
      const [notes, userRepositories] = composedData;
      return transformNotes(notes, userRepositories);
    });
};

const getNoteByIdAuth = (noteId, login, accessToken) => {
  const leanNote = Note.findOne({
    where: {
      id: noteId
    },
    raw: true,
    nest: true,
  });

  const userRepositoriesPromise = githubService.getUserRepositories(
    login,
    accessToken,
  );

  return Promise
    .all([leanNote, userRepositoriesPromise])
    .then((composedData) => {
      const [note, userRepositories] = composedData;
      return transformSingleNote(note, userRepositories);
    });
};

const deleteNote = note_id => Note.destroy({
  where: {
    id: note_id
  }
});

const updateNote = (note_id, newNoteBody) => Note.update(newNoteBody, {
  where: {
    id: note_id
  }
});

const createNote = noteBody => Note.create(noteBody);

module.exports = {
  getNoteById,
  getNotes,
  deleteNote,
  updateNote,
  createNote,
  getAuthNotes,
  getNoteByIdAuth,
};
