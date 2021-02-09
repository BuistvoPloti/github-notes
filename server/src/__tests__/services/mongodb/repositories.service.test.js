import * as repositoriesService
  from "../../../services/mongodb/repositories.service";
import Repository from "../../../models/mongodb/repository";

const repositoryId = "45gjf35";
const mockRepositories = {
  id: "45gjf35",
  name: "test name",
};

const findRepositoryById = (repositories, repository_id) => {
  return repositories.find(el => el.id === repository_id);
};

const mockUpdateRepository = (repository_id, newRepositoryBody) => {
  const repositoryToUpdate = findRepositoryById([mockRepositories], repository_id);
  return { repositories: { ...repositoryToUpdate, ...newRepositoryBody } };
};

describe("services/mongodb/repositories.service", () => {
  test("finds repositories", async () => {
    const mock = jest.spyOn(Repository, "find");
    const resultData = { repositories: { data: "some data" } };
    mock.mockImplementation(() => Promise.resolve(resultData));
    const response = await repositoriesService.getRepositories();
    expect(response).toStrictEqual(resultData);
    mock.mockRestore();
  });

  test("finds repository by id", async () => {
    const mock = jest.spyOn(Repository, "findById");
    mock.mockImplementation(id => Promise.resolve(findRepositoryById([mockRepositories], id)));
    const response = await repositoriesService.getRepositoryById(repositoryId);
    expect(response).toStrictEqual(mockRepositories);
    mock.mockRestore();
  });

  test("updates repository", async () => {
    const mock = jest.spyOn(Repository, "findOneAndUpdate");
    const mockUpdatedRepository = {
      ...mockRepositories,
      name: "updated test name"
    };
    const resultData = { repositories: mockUpdatedRepository };
    mock.mockImplementation((repository_id, newRepositoryBody) => Promise.resolve(
      mockUpdateRepository(repository_id, newRepositoryBody)
    ));
    const response = await repositoriesService
      .updateRepository(repositoryId, mockUpdatedRepository);
    expect(response).toStrictEqual(resultData);
    mock.mockRestore();
  });
});
