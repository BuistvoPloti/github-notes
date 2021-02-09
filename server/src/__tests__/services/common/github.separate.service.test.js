import * as selfGithubService from "../../../services/common/github.service";

const access_token = "45tgc4f5gc45j";
const userLogin = "Test Login";

const mockNormalizedRepositories = [{
  id: 1,
  name: "test name",
  description: "qwe",
  fork: false,
  stars: 123,
  creator_name: "qwe",
  created_at: "qwe",
  starred: false,
}];

const mockStarredRepositories = {
  body: [{
    ...mockNormalizedRepositories[0],
    owner: { login: "qwe" },
    stargazers_count: 123,
    id: 2,
    starred: true,
    extraField1: "just a redundant field",
    extraField2: "just a redundant field",
    extraField3: "just a redundant field"
  }]
};

const mockForkedRepositories = {
  body: [{
    ...mockNormalizedRepositories[0],
    owner: { login: "qwe" },
    stargazers_count: 123,
    fork: true,
    extraField1: "just a redundant field",
    extraField2: "just a redundant field",
    extraField3: "just a redundant field"
  }]
};

test("should fetch and return transformed repositories", async () => {
  const mock = jest.fn()
    .mockImplementation((login, token, source) => {
      if (login && token) {
        return source === "repos" ? mockForkedRepositories : mockStarredRepositories;
      }
    });
  // eslint-disable-next-line no-import-assign
  selfGithubService.getTypedRepositories = mock;
  const mockResultRepositories = [
    {
      id: 1,
      name: "test name",
      description: "qwe",
      fork: true,
      stars: 123,
      creator_name: "qwe",
      created_at: "qwe",
      starred: false
    },
    {
      id: 2,
      name: "test name",
      description: "qwe",
      fork: false,
      stars: 123,
      creator_name: "qwe",
      created_at: "qwe",
      starred: true
    }
  ];
  const response = await selfGithubService.getUserRepositories(userLogin, access_token);
  expect(response).toStrictEqual(mockResultRepositories);
});
