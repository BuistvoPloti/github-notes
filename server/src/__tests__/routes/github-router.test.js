import * as handler from "../../handlers/github.handler";
import { authProtection } from "../../middlewares/auth";

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

describe("routes/github/github", () => {
  import("../../routes/github/github");
  test("should test /authorize/callback", () => {
    expect(getSpy).toHaveBeenCalledWith("/authorize/callback");
    expect(getSpy).toHaveBeenCalledWith(handler.authorizeGithubUser);
  });
  test("should test /repositories/:user/:id", () => {
    expect(getSpy).toHaveBeenCalledWith("/repositories/:user/:id");
    expect(getSpy).toHaveBeenCalledWith(authProtection, handler.getUserRepository);
  });
  test("should test /repositories", () => {
    expect(getSpy).toHaveBeenCalledWith("/repositories");
    expect(getSpy).toHaveBeenCalledWith(authProtection, handler.getUserRepositories);
  });
  test("should test /user", () => {
    expect(getSpy).toHaveBeenCalledWith("/user");
    expect(getSpy).toHaveBeenCalledWith(authProtection, handler.getUser);
  });
  test("should test /logout", () => {
    expect(getSpy).toHaveBeenCalledWith("/logout");
    expect(getSpy).toHaveBeenCalledWith(authProtection, handler.logoutGithubUser);
  });
});
