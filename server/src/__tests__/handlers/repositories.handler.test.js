import * as handler from "../../handlers/repositories.handler";
import { services } from "../../services/db-resolver.service";

jest.mock("../../services/db-resolver.service");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = () => {
  const req = {};
  req.params = jest.fn().mockReturnValue(req);
  return req;
};

const mockNext = () => jest.fn();

describe("handlers/repositories.handler", () => {
  afterEach(() => {
    jest.resetModules();
  });
  test("tests #getRepositories", async () => {
    const repositories = [{}, {}];
    const responseData = { data: { repositories: repositories }, status: "success" };
    services.repositoriesService
      .getRepositories.mockImplementation(() => Promise.resolve(repositories));
    const res = mockResponse();
    const next = mockNext();
    await handler.getRepositories(null, res, next);
    expect(res.json).toBeCalledWith(responseData);
    expect(res.status).toBeCalledWith(200);
  });
  test("tests #getRepositoryById", async () => {
    const repository = [{}];
    const responseData = { data: { repository }, status: "success" };
    services.repositoriesService
      .getRepositoryById.mockImplementation(_id => Promise.resolve(repository));
    const res = mockResponse();
    const req = mockRequest();
    req.params = { id: 123 };
    const next = mockNext();
    await handler.getRepositoryById(req, res, next);
    expect(res.json).toBeCalledWith(responseData);
    expect(res.status).toBeCalledWith(200);
  });
  test("tests #deleteRepository", async () => {
    const repository = [{}];
    services.repositoriesService
      .deleteRepository.mockImplementation(_id => Promise.resolve(repository));
    const res = mockResponse();
    const req = mockRequest();
    req.params = { id: 123 };
    const next = mockNext();
    await handler.deleteRepository(req, res, next);
    expect(res.json).toBeCalledWith(null);
    expect(res.status).toBeCalledWith(202);
  });
  test("tests #updateRepository", async () => {
    const updatedRepository = [{}];
    const responseData = { data: { updatedRepository }, status: "success" };
    services.repositoriesService
      .updateRepository.mockImplementation((_id, _body) => Promise.resolve(updatedRepository));
    const res = mockResponse();
    const req = mockRequest();
    req.body = {
      name: "name",
      description: "descr",
      stars: 123,
      creator_name: "cr name",
    };
    const next = mockNext();
    await handler.updateRepository(req, res, next);
    expect(res.json).toBeCalledWith(responseData);
    expect(res.status).toBeCalledWith(200);
  });
  test("tests #createRepository", async () => {
    const body = {
      name: "name",
      description: "d",
      stars: 123,
      creator_name: "cr name",
    };
    const responseData = {
      data: {
        repository: {
          ...body,
          created_at: expect.any(Date),
        }
      },
      status: "success"
    };
    services.repositoriesService
      .createRepository.mockImplementation(_body => Promise.resolve(_body));
    const res = mockResponse();
    const req = mockRequest();
    req.body = body;
    const next = mockNext();
    await handler.createRepository(req, res, next);
    expect(res.json).toBeCalledWith(expect.objectContaining(responseData));
    expect(res.status).toBeCalledWith(201);
  });
});
