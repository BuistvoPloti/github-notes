const Repository = require("../../models/mongodb/repository");
const Note = require("../../models/mongodb/note");
const { validateQueryData } = require("../../utils/response-helpers");

const getRepositoryById = repository_id => Repository.findById(repository_id);

const getRepositories = () => Repository.find();

const deleteRepository = repository_id => Repository.findOneAndDelete({ _id: repository_id })
  .then((repository) => {
    validateQueryData(repository);
  })
  .then(() => Note.find({ repository_id: repository_id }, { new: true }))
  .then(
    notes => notes && Promise.all(
      notes.map(note => Note.findOneAndDelete({ _id: note._id }))
    )
  );

const updateRepository = (repository_id, newRepositoryBody) => Repository.findOneAndUpdate(
  { _id: repository_id },
  newRepositoryBody,
  { new: true }
);

const createRepository = repositoryBody => Promise.resolve()
  .then(() => new Repository(repositoryBody))
  .then(repository => repository.save());

module.exports = {
  getRepositoryById,
  getRepositories,
  deleteRepository,
  updateRepository,
  createRepository,
};
