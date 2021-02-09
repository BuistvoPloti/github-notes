import axios from "axios";
import { config } from "../config";
import { ApiResponseDataType, INote, IRepository } from "../types/types";

const {
  api: {
    repositories_url,
    notes_url,
    github_repositories_url,
    logout_url,
    baseUrl
  },
  app: {
    github_user_url
  }
} = config;

const instance = axios.create({
  withCredentials: true,
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

export const repositoriesAPI = {
  getRepositories(isAuth = false) {
    return instance
      .get<ApiResponseDataType<IRepository[]>>((isAuth ? github_repositories_url : repositories_url) as string)
      .then((response) => {
        return response.data.data.repositories;
      });
  },
  deleteRepositories(repository_id: number | string) {
    return instance.delete(`${repositories_url}/${repository_id}`);
  },
  createRepositoryRequest(repository: IRepository) {
    return instance.post<ApiResponseDataType<IRepository>>(repositories_url as string, repository);
  },
  getRepositoryById(repository_identifier: number | string, user_name?: string, isAuth?: boolean) {
    const authUrlPick = (isAuth ? github_repositories_url : repositories_url) as string;
    return instance.get<ApiResponseDataType<IRepository>>(
      `${authUrlPick + (isAuth ? "/" + user_name + "/" : "/")}${repository_identifier}`
    );
  },
  updateRepositoryRequest(repository: IRepository, repository_id: number | string) {
    return instance.put<ApiResponseDataType<IRepository>>(`${repositories_url}/${repository_id}`, repository);
  },
};

export const notesAPI = {
  getNotes() {
    return instance
      .get<ApiResponseDataType<INote[]>>(notes_url as string)
      .then((response) => {
        return response.data.data.notes;
      });
  },
  getNoteById(note_id: number | string) {
    return instance.get<ApiResponseDataType<INote>>(`${notes_url}/${note_id}`);
  },
  deleteNotes(note_id: number | string) {
    return instance.delete(`${notes_url}/${note_id}`);
  },
  createNoteRequest(note: INote) {
    return instance.post<ApiResponseDataType<INote>>(notes_url as string, note);
  },
  updateNoteRequest(note: INote, note_id: number | string) {
    return instance.put<ApiResponseDataType<INote>>(`${notes_url}/${note_id}`, note);
  },
};

export const authAPI = {
  getAuthUserData() {
    return instance.get(github_user_url as string);
  },
  logout() {
    return instance.delete(logout_url as string);
  },
};
