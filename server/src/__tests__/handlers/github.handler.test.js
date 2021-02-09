import * as handler from "../../handlers/github.handler";
import * as githubService from "../../services/common/github.service";
import { authenticateRequest } from "../../utils/auth.utils";

jest.mock("../../services/common/github.service");
jest.mock("../../utils/auth.utils");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.redirect = jest.fn();
  res.clearCookie = jest.fn();
  res.send = jest.fn();
  return res;
};

const mockRequest = () => {
  const req = {};
  req.params = { user: "usr123", id: 123 };
  req.query = { code: 123 };
  req.session = { isAuthenticated: true };
  return req;
};

const mockNext = () => jest.fn();

describe("handlers/github.handler", () => {
  afterEach(() => {
    jest.resetModules();
  });
  test("tests #authorizeGithubUser", async () => {
    authenticateRequest.mockImplementation(() => Promise.resolve({ a: 1 }));
    githubService
      .authorizeGithubUser.mockImplementation(code => Promise.resolve({ c: code }));
    githubService
      .getUser.mockImplementation(_token => Promise.resolve({ body: { login: "n123", id: 123 } }));
    const req = mockRequest();
    const res = mockResponse();
    const next = mockNext();
    await handler.authorizeGithubUser(req, res, next);
    expect(res.redirect).toBeCalledWith("http://localhost:3000/login");
  });
  test("tests #getUserRepository", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = mockNext();
    const repository = {};
    const responseData = { data: { repository }, status: "success", };
    githubService
      .getUserRepository.mockImplementation(() => Promise.resolve({ body: repository }));
    await handler.getUserRepository(req, res, next);
    expect(res.json).toBeCalledWith(responseData);
    expect(res.status).toBeCalledWith(200);
  });
  test("tests #logoutGithubUser", async () => {
    const res = mockResponse();
    await handler.logoutGithubUser(null, res);
    expect(res.clearCookie).toBeCalledWith("access_token");
    expect(res.clearCookie).toBeCalledWith("connect.sid");
    expect(res.status).toBeCalledWith(204);
  });
});
