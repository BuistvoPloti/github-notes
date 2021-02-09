export type Owner = {
  id: number | string,
  login: string,
}
export interface IRepository {
  name: string,
  description: string | null,
  stars: string | number,
  creator_name: string,
  id: string | number,
  created_at: string,
  stargazers_count?: number,
  owner?: Owner,
  starred?: boolean,
  fork?: boolean,
}
export interface INote {
  creator_id: string | null,
  id: string | number,
  repository_id: string | number,
  text: string,
  created_at: string,
  related_repository: [
    {
      name: string,
      id: string | number,
      created_at?: string,
    }
  ]
}
export type MatchParams = {
  id?: string | undefined,
  user?: string,
}
export type LocalFetchDataWrapper<Type> = {
  pending?: boolean,
  data: Type | undefined,
}
export type ServerResponseWithData<Type> = {
  data: {
    data: {
      [key: string] : Type,
    },
  }
}
export type InitializeAppAuthType = {
  status: boolean;
}
export type SetNotesType = {
  notes: INote[],
}
export type DeleteNoteType = {
  note_id: number | string,
}
export type UpdateNoteType = {
  note: INote
}
export type SetRepositoriesType = {
  repositories: IRepository[],
}
export type DeleteRepositoryType = {
  repository_id: number | string,
}
export type UpdateRepositoryType = {
  repository: IRepository,
}
export type AddRepositoryType = {
  repository: IRepository,
}
export type ApiResponseDataType<T> = {
  status: string,
  data: {
    [key: string]: T
  },
  errors?: [
    {
      status: number,
      detail: string
    }
  ]
}