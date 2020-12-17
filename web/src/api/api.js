import * as axios from "axios";
import { config } from "../config";

const instance = (url) =>
  axios.create({
    withCredentials: true,
    baseURL: url,
  });

const {
  api: {
    repositories_url,
    notes_url,
    github_repositories_url,
    logout_url,
  },
  app: {
    github_user_url
  }
} = config;

export const repositoriesAPI = {
  getRepositories(isAuth = false) {
    return instance(
      isAuth ? github_repositories_url : repositories_url
    )
      .get()
      .then((response) => {
        return response.data.repositories;
      });
  },
  deleteRepositories(repository_id) {
    return instance(repositories_url).delete(`/${repository_id}`);
  },
  createRepositoryRequest(repository) {
    return instance(repositories_url).post(`/`, repository);
  },
  getRepositoryById(repository_identifier, user_name, isAuth) {
    return instance(isAuth ? github_repositories_url : repositories_url).get(
      `${isAuth ? "/" + user_name + "/" : "/"}${repository_identifier}`
    );
  },
  updateRepositoryRequest(repository, repository_id) {
    return instance(repositories_url).put(`/${repository_id}`, repository);
  },
};

export const notesAPI = {
  getNotes() {
    return instance(notes_url)
      .get("/")
      .then((response) => {
        return response.data.notes;
      });
  },
  getNoteById(note_id) {
    return instance(notes_url).get(`/${note_id}`);
  },
  deleteNotes(note_id) {
    return instance(notes_url).delete(`/${note_id}`);
  },
  createNoteRequest(note) {
    return instance(notes_url).post(`/`, note);
  },
  updateNoteRequest(note, note_id) {
    return instance(notes_url).put(`/${note_id}`, note);
  },
};

export const authAPI = {
  me() {
    return instance(github_user_url).get();
  },
  logout() {
    return instance(logout_url).delete();
  },
};
