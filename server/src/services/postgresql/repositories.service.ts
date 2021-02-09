import { Model } from "sequelize";
import { INote, IRepository } from "../../types/types";

import { sequelize } from "../../models/postgresql";
import { validateQueryData } from "../../utils/response-helpers";

const { models } = sequelize();

const Repository = models.repository;
const Note = models.note;

const getRepositoryById = async (repository_id: number): Promise<any> => Repository.findOne({
  where: {
    id: repository_id
  }
});

const getRepositories = async (): Promise<any> => Repository.findAll({});

const deleteRepository = async (repositoryId: number) => {
  const deletedRepository: number = await Repository.destroy({
    where: {
      id: repositoryId,
    },
  });
  validateQueryData(deletedRepository);
  const notes: Model<INote>[] = await Note.findAll({
    where: {
      repository_id: repositoryId
    },
    raw: true,
    nest: true,
  });

  return notes.length && Promise.all(
    [notes.forEach((note: any) => Note.destroy({
      where: {
        id: note.id
      }
    }))]
  );
};

const updateRepository = async (
  repository_id: number,
  newRepositoryBody: IRepository
): Promise<any> => (
  Repository.update(newRepositoryBody, {
    where: {
      id: repository_id
    }
  })
);

const createRepository = async (repositoryBody: IRepository): Promise<any> => (
  Repository.create(repositoryBody)
);

export {
  getRepositoryById,
  getRepositories,
  deleteRepository,
  updateRepository,
  createRepository,
};
