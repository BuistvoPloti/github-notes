import repositoriesSlice from "./repository.reducer";

export const { setRepositories, deleteRepository, updateRepository, addRepository } = repositoriesSlice.actions;
export const repositoryReducer = repositoriesSlice.reducer;
export default repositoriesSlice;