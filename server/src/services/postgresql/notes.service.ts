import { Model } from "sequelize";
import { INote, IRepository } from "../../types/types";
import { transformNotes, transformSingleNote } from "../../utils/helpers";
import config from "../../config";
import { sequelize } from "../../models/postgresql";
import * as githubService from "../common/github.service";

const { models } = sequelize();

const { postgresql: { requestOpts: { rawNest } } } = config;

const Note = models.note;
const Repository = models.repository;

const getNoteById = async (noteId: number): Promise<INote> => {
  const note: Model<INote> | null = await Note.findOne({
    where: {
      id: noteId
    },
    raw: true,
    nest: true,
  });
  const repositories: Model<IRepository>[] = await Repository.findAll(rawNest);
  return transformSingleNote(note, repositories);
};

const getNotes = async (): Promise<INote[]> => {
  const notes: Model<INote>[] | null = await Note.findAll({
    where: {
      creator_id: null
    },
    raw: true,
    nest: true,
  });
  const repositories: Model<IRepository>[] | null = await Repository.findAll(rawNest);
  return transformNotes(notes, repositories);
};

const getAuthNotes = async (
  creatorLogin: string,
  userLogin: string,
  accessToken: string
): Promise<INote[]> => {
  const notes: Model<INote>[] | null = await Note.findAll({
    where: {
      creator_id: creatorLogin
    },
    raw: true,
    nest: true,
  });
  const userRepositories = await githubService.getUserRepositories(
    userLogin,
    accessToken,
  );
  return transformNotes(notes, userRepositories);
};

const getNoteByIdAuth = async (
  noteId: number,
  login: string,
  accessToken: string
): Promise<INote> => {
  const note: Model<INote> | null = await Note.findOne({
    where: {
      id: noteId
    },
    raw: true,
    nest: true,
  });

  const userRepositories = await githubService.getUserRepositories(
    login,
    accessToken,
  );
  return transformSingleNote(note, userRepositories);
};

const deleteNote = (
  noteId: number,
  creatorId: string
) => Note.destroy({
  where: {
    id: noteId,
    creator_id: creatorId,
  }
});

const updateNote = async (
  noteId: number,
  newNoteBody: INote,
  creatorId: string
): Promise<INote> => {
  const updatedNote: any = await Note.update(newNoteBody, {
    where: {
      id: noteId,
      creator_id: creatorId,
    },
    returning: true,
  });
  return updatedNote[1];
};

const createNote = async (noteBody: INote): Promise<any> => Note.create(noteBody);

const checkIfRelatedRepositoryExist = async (repositoryId: number): Promise<boolean> => {
  const repository: Model<IRepository> | null = await Repository.findOne({
    where: {
      id: repositoryId
    }
  });
  return Boolean(repository);
};

export {
  getNoteById,
  getNotes,
  deleteNote,
  updateNote,
  createNote,
  getAuthNotes,
  getNoteByIdAuth,
  checkIfRelatedRepositoryExist
};
