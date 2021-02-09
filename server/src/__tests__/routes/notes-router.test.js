import * as handler from "../../handlers/notes.handler";

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

describe("routes/notes/notes", () => {
  import("../../routes/notes/notes");
  test("should test /", () => {
    expect(getSpy).toHaveBeenCalledWith("/");
    expect(getSpy).toHaveBeenCalledWith(handler.getNotes);
    expect(getSpy).toHaveBeenCalledWith(handler.createNote);
  });
  test("should test /:id", () => {
    expect(getSpy).toHaveBeenCalledWith("/:id");
    expect(getSpy).toHaveBeenCalledWith(handler.getNoteById);
    expect(getSpy).toHaveBeenCalledWith(handler.updateNote);
    expect(getSpy).toHaveBeenCalledWith(handler.deleteNote);
  });
});
