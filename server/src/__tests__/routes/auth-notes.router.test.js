import * as handler from "../../handlers/auth-notes.handler";

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

describe("routes/notes/auth-notes", () => {
  import("../../routes/notes/auth-notes");
  test("should test /", () => {
    expect(getSpy).toHaveBeenCalledWith("/");
    expect(getSpy).toHaveBeenCalledWith(handler.getAuthNotes);
    expect(getSpy).toHaveBeenCalledWith(handler.createNote);
  });
  test("should test /:id", () => {
    expect(getSpy).toHaveBeenCalledWith("/:id");
    expect(getSpy).toHaveBeenCalledWith(handler.getAuthNoteById);
    expect(getSpy).toHaveBeenCalledWith(handler.updateNote);
    expect(getSpy).toHaveBeenCalledWith(handler.deleteNote);
  });
});
