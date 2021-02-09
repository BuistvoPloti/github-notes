import * as handler from "../../handlers/repositories.handler";

const getSpy = jest.fn().mockReturnThis();
jest.doMock("express", () => ({
  Router() {
    return {
      route: getSpy,
      post: getSpy,
      get: getSpy,
      put: getSpy,
      delete: getSpy,
    };
  }
}));

describe("routes/repositories/repositories", () => {
  import("../../routes/repositories/repositories");
  test("should test /", () => {
    expect(getSpy).toHaveBeenCalledWith("/");
    expect(getSpy).toHaveBeenCalledWith(handler.getRepositories);
    expect(getSpy).toHaveBeenCalledWith(handler.createRepository);
  });
  test("should test /:id", () => {
    expect(getSpy).toHaveBeenCalledWith("/:id");
    expect(getSpy).toHaveBeenCalledWith(handler.getRepositoryById);
    expect(getSpy).toHaveBeenCalledWith(handler.deleteRepository);
    expect(getSpy).toHaveBeenCalledWith(handler.updateRepository);
  });
});
