import * as fp from "lodash/fp";
import { INote, IRepository } from "../../types/types";
import * as githubService from "../common/github.service";
import { findRepoIdMatch, excludeMongoVariables } from "../../utils/lodash.utils";
import Note from "../../models/mongodb/note";
import Repository from "../../models/mongodb/repository";

const getNoteById = async (noteId: string): Promise<INote | null> => (
  Note
    .findById(noteId)
    .populate(
      "related_repository",
      "name"
    )
);

const getNoteByIdAuth = async (
  noteId: string,
  login: string,
  accessToken: string
): Promise<INote> => {
  const note: INote = await Note.findById(
    noteId,
    null,
    { lean: true }
  );
  const userRepositories: IRepository[] = await githubService.getUserRepositories(
    login,
    accessToken,
  );
  const repoIdMatch: IRepository = findRepoIdMatch(
    note.repository_id,
    userRepositories
  );
  const extraData = {
    related_repository: [{ name: repoIdMatch.name, id: repoIdMatch.id }],
    id: note._id,
  };

  return fp.pipe(
    excludeMongoVariables,
    (it: INote) => fp.merge(it, extraData)
  )(note);
};

const getNotes = async (): Promise<INote[]> => Note.find()
  .where("creator_id")
  .equals(null)
  .populate("related_repository", "name");

const getAuthNotes = async (
  creatorLogin: string,
  login: string,
  accessToken: string
): Promise<INote[]> => {
  const notes: INote[] = await Note
    .find(
      { creator_id: creatorLogin },
      null,
      { lean: true }
    );
  const userRepositories: IRepository[] = await githubService.getUserRepositories(
    login,
    accessToken,
  );

  return notes.map((note: INote) => {
    const repoIdMatch = findRepoIdMatch(note.repository_id, userRepositories);
    const extraData = {
      related_repository: [{ name: repoIdMatch.name, id: repoIdMatch.id }],
      id: note._id,
    };

    return fp.pipe(
      excludeMongoVariables,
      (it: INote) => fp.merge(it, extraData)
    )(note);
  });
};

const deleteNote = async (noteId: string, creatorId: string): Promise<INote | null> => (
  Note.findOneAndDelete({ _id: noteId, creator_id: creatorId })
);

const updateNote = async (
  noteId: string,
  newNoteBody: {[key: string]: string},
  creatorId: string
): Promise<INote | null> => Note.findOneAndUpdate(
  {
    _id: noteId,
    creator_id: creatorId
  },
  newNoteBody,
  {
    new: true
  }
);

const createNote = async (noteBody: INote): Promise<INote> => {
  const note: any = await new Note(noteBody);
  return note.save();
};

const checkIfRelatedRepositoryExist = async (repositoryId: string): Promise<boolean> => (
  Repository.exists({ _id: repositoryId })
);

export {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
  getAuthNotes,
  getNoteByIdAuth,
  checkIfRelatedRepositoryExist
};
