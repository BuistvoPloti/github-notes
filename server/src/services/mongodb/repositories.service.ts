import { INote, IRepository } from "../../types/types";

import Repository from "../../models/mongodb/repository";
import Note from "../../models/mongodb/note";

import { validateQueryData } from "../../utils/response-helpers";

const getRepositories = async (): Promise<IRepository[]> => Repository.find();

const getRepositoryById = async (repository_id: string): Promise<IRepository | null> => (
  Repository.findById(repository_id)
);

const deleteRepository = async (
  repository_id: string
): Promise<any> => {
  const deletedRepository: IRepository | null = await Repository.findOneAndDelete({
    _id: repository_id
  });
  validateQueryData(deletedRepository);
  const notes: INote[] = await Note.find({
    repository_id: repository_id
  },
  {
    new: true
  });
  return Boolean(notes.length) && Promise.all(
    notes.map((note: INote) => Note.findOneAndDelete({ _id: note._id }))
  );
};

const updateRepository = async (
  repository_id: string,
  newRepositoryBody: IRepository
): Promise<IRepository | null> => (
  Repository.findOneAndUpdate(
    {
      _id: repository_id
    },
    newRepositoryBody,
    {
      new: true
    }
  )
);

const createRepository = async (repositoryBody: IRepository) => {
  const repository: any = await new Repository(repositoryBody);
  return repository.save();
};

export {
  getRepositoryById,
  getRepositories,
  deleteRepository,
  updateRepository,
  createRepository,
};
