const { models } = require("../../models/postgresql");
const { validateQueryData } = require("../../utils/response-helpers");

const Repository = models.repository;
const Note = models.note;

const getRepositoryById = repository_id => Repository.findOne({
  where: {
    id: repository_id
  }
});

const getRepositories = () => Repository.findAll({});

const deleteRepository = repositoryId => Repository.destroy({
  where: {
    id: repositoryId
  }
})
  .then((recordFlag) => {
    console.log(recordFlag);
    validateQueryData(recordFlag);
  })
  .then(() => Note.findAll({
    where: {
      repository_id: repositoryId
    },
    raw: true,
    nest: true,
  }))
  .then((notes) => {
    console.log(notes);
    return notes;
  })
  .then(notes => notes && Promise.all(
    [notes.forEach(note => Note.destroy({
      where: {
        id: note.id
      }
    }))]
  ));

const updateRepository = (repository_id, newRepositoryBody) => Repository
  .update(newRepositoryBody, {
    where: {
      id: repository_id
    }
  });

const createRepository = repositoryBody => Repository.create(repositoryBody);

module.exports = {
  getRepositoryById,
  getRepositories,
  deleteRepository,
  updateRepository,
  createRepository,
};
