import * as fp from "lodash/fp";
import { GithubReposBody } from "../types/github-response";
import { findRepoIdMatch } from "./lodash.utils";
import { INote } from "../types/types";

export const transformSingleNote = (note: any, repositories: any) => {
  const repoIdMatch = findRepoIdMatch(note.repository_id, repositories);
  if (!repoIdMatch) return;
  const extraData = {
    related_repository: [{
      name: repoIdMatch.name,
      id: repoIdMatch.id
    }],
  };

  return fp.merge(note, extraData);
};

export const transformNotes = (notes: any, repositories: any) => notes.map((note: INote) => {
  return transformSingleNote(note, repositories);
});

export const transformRepositories = (repositories: GithubReposBody[], isStarred: boolean) => (
  repositories.map(repo => ({
    id: repo.id,
    name: repo.name,
    description: repo.description,
    fork: repo.fork,
    stars: repo.stargazers_count,
    creator_name: repo.owner.login,
    created_at: repo.created_at,
    starred: isStarred,
  }))
);
