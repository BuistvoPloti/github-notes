import {
  authorizeGithubUser,
  getUser,
  getUserRepository,
} from "../../../services/common/github.service";

const access_token = "45tgc4f5gc45j";
const code = "j5n35nj";
const userLogin = "Test Login";
const mockResponseData = {
  data: {
    access_token
  }
};
const mockErrorResponseData = {
  data: {
    errors: "some errors"
  }
};
const mockUserData = {
  data: {
    userId: 12345,
    login: userLogin,
    avatar_url: "https://some/image.jpg"
  }
};
const mockRepository = {
  data: {
    id: 1,
    name: "test name",
    stars: 3,
  }
};

jest.mock("../../../services/common/github.service", () => ({
  authorizeGithubUser: (queryCode) => {
    if (queryCode === code) {
      return Promise.resolve(mockResponseData);
    }
    return Promise.resolve(mockErrorResponseData);
  },
  getUser: (token) => {
    if (token && access_token === token) {
      return Promise.resolve(mockUserData);
    }
    return Promise.resolve(mockErrorResponseData);
  },
  getUserRepository: (login, name) => {
    if (login) {
      return Promise.resolve({ ...mockRepository, name });
    }
    return Promise.resolve(mockErrorResponseData);
  }
}));

describe("services/common/github.service", () => {
  test("calls github api for access_token if code is valid", async () => {
    const response = await authorizeGithubUser(code);
    expect(response.data.access_token)
      .toEqual(access_token);
  });
  test("calls github api for access_token and fails if code is invalid", async () => {
    const response = await authorizeGithubUser("invalid code");
    expect(response)
      .toMatchObject(mockErrorResponseData);
  });
  test("should get user data if token is valid", async () => {
    const response = await getUser(access_token);
    expect(response).toMatchObject(mockUserData);
  });
  test("should fail fetching user data", async () => {
    const response = await getUser("invalid token");
    expect(response).toMatchObject(mockErrorResponseData);
  });
  test("should fetch and get user's repository data", async () => {
    const repositoryName = "test name";
    const response = await getUserRepository(userLogin, repositoryName);
    expect(response).toMatchObject({ ...mockRepository, name: repositoryName });
  });
});
