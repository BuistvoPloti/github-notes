const mongoose = require("mongoose");
const fp = require("lodash/fp");
const path = require("path");
const { findRepoIdMatch } = require("./lodash.utils");
const { db: { currentDbName }, application: { root_path } } = require("../config");

const transformNotes = (notes, repositories) => notes.map((note) => {
  const repoIdMatch = findRepoIdMatch(
    note.repository_id,
    repositories
  );

  const extraData = {
    related_repository: [{
      name: repoIdMatch.name,
      id: repoIdMatch.id
    }],
  };

  return fp.merge(note, extraData);
});

const transformSingleNote = (note, repositories) => {
  const repoIdMatch = findRepoIdMatch(note.repository_id, repositories);
  const extraData = {
    related_repository: [{
      name: repoIdMatch.name,
      id: repoIdMatch.id
    }],
  };

  return fp.merge(note, extraData);
};

const idToObjectId = id => mongoose.Types.ObjectId(id);

const transformRepositories = (repositories, flag) => repositories.map(repo => ({
  id: repo.id,
  name: repo.name,
  description: repo.description,
  fork: repo.fork,
  stars: repo.stargazers_count,
  creator_name: repo.owner.login,
  created_at: repo.created_at,
  starred: flag,
}));

const nestedObjectToNestedArray = (sourceArray, property) => sourceArray.map(obj => ({
  ...obj,
  [property]: [obj[property]]
}));

const resolveServicePath = (fileMainName, customFolder) => path
  .join(`${root_path}/src/services/${customFolder || currentDbName}/${fileMainName}.service`)
  .replace(/\\/g, "/");

module.exports = {
  idToObjectId,
  transformRepositories,
  nestedObjectToNestedArray,
  resolveServicePath,
  transformNotes,
  transformSingleNote,
};
