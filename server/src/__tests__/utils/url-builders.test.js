import { githubRepositoriesUrlBuilder, githubBaseUrlBuilder } from "../../utils/url-builders";

describe("utils/url-builders", () => {
  test("get base url github with specific resource", () => {
    const baseUrlExample = "https://api.github.com/users";
    const config = { resource: "users" };
    expect(githubBaseUrlBuilder(config)).toBe(baseUrlExample);
  });
  test("get github url with params", () => {
    const baseUrlExample = "https://api.github.com/users/john/repositories?access_token=cqjk4g13h&per_page=100";
    const config = {
      login: "john",
      access_token: "cqjk4g13h",
      source: "repositories",
    };
    const paginationConfig = {
      per_page: 100,
    };
    expect(githubRepositoriesUrlBuilder(config, paginationConfig)).toBe(baseUrlExample);
  });
});
