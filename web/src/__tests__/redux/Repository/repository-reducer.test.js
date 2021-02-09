import { setRepositories, deleteRepository, updateRepository, addRepository } from "../../../redux/Repository";
import { repositoryReducer } from "../../../redux/Repository";

describe("redux/Repository", () => {
  test('should return the initial state', () => {
    const initialState = { repositories: [] };
    expect(repositoryReducer(undefined, {})).toEqual(initialState);
  });
  test("should handle setRepositories", () => {
    const mData = [{}];
    const initialState = { repositories: [] };
    const changedState = { repositories: mData };
    expect(repositoryReducer(initialState, setRepositories(mData))).toEqual(changedState);
  });
  test("should handle deleteRepository", () => {
    const mData = [{ id:1 }];
    const initialState = { repositories: mData };
    const changedState = { repositories: [] };
    const repository_id = 1;
    expect(repositoryReducer(initialState, deleteRepository(repository_id))).toEqual(changedState);
  });
  test("should handle updateRepository", () => {
    const repository_id = 1;
    const name = "orig name";
    const updatedName = "new name";
    const repository = { id: repository_id, name };
    const newRepository = { id: repository_id, name: updatedName };
    const initialState = { repositories: [{ ...repository }] };
    const changedState = { repositories: [{ ...newRepository }] };
    expect(repositoryReducer(initialState, updateRepository(newRepository))).toEqual(changedState);
  });
  test("should handle addRepository", () => {
    const mData = { id: 1 } ;
    const initialState = { repositories: [] };
    const changedState = { repositories: [mData] };
    expect(repositoryReducer(initialState, addRepository(mData))).toEqual(changedState);
  });
});

