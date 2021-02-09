import { runSaga } from "redux-saga";
import { deleteNoteFlow } from "../../../redux/sagas/notes/deleteNote";
import { notesAPI } from "../../../api/api";

test("runs #deleteNoteFlow saga", async () => {
  const mNotesApi = jest.spyOn(notesAPI, "deleteNotes")
    .mockReturnValue([]);
  const fakeStore = {
    getState: jest.fn(),
    dispatch: jest.fn(),
  };
  const mAction = { payload: { user_id: 123 } };
  await runSaga(fakeStore, () => deleteNoteFlow(mAction)).toPromise();
  expect(mNotesApi).toBeCalledTimes(1);
});

