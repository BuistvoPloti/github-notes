import { runSaga } from "redux-saga";
import { loadNotesFlow } from "../../../redux/sagas/notes/loadNotes";
import { notesAPI } from "../../../api/api";
import { setNotes } from "../../../redux/Note";

test("runs #loadNotesFlow saga", async () => {
  const mNotes = [{}];
  const mNotesApi = jest.spyOn(notesAPI, "getNotes")
    .mockImplementation(() => Promise.resolve(mNotes));
  const dispatchedActions = [];
  const fakeStore = {
    getState: () => ({ notes: mNotes }),
    dispatch: action => dispatchedActions.push(action),
  };
  await runSaga(fakeStore, loadNotesFlow).toPromise();
  expect(mNotesApi).toBeCalledTimes(1);
  expect(dispatchedActions).toContainEqual(setNotes(mNotes));
});
