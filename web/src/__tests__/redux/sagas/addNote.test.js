import { runSaga } from "redux-saga";
import { addNoteFlow } from "../../../redux/sagas/notes/addNote";
import { notesAPI } from "../../../api/api";
import { setNotes } from "../../../redux/Note";

test("runs #addNoteFlow saga", async () => {
  const mNotes = [{}];
  const mGetNotes = jest.spyOn(notesAPI, "getNotes")
    .mockImplementation(() => Promise.resolve(mNotes));
  const mCreateNote = jest.spyOn(notesAPI, "createNoteRequest")
    .mockReturnValue(null);
  const dispatchedActions = [];
  const fakeStore = {
    getState: () => ({ notes: mNotes }),
    dispatch: action => dispatchedActions.push(action),
  };
  const mAction = { payload: { note: {} } };
  await runSaga(fakeStore, () => addNoteFlow(mAction)).toPromise();
  expect(mGetNotes).toBeCalledTimes(1);
  expect(mCreateNote).toBeCalledTimes(1);
  expect(dispatchedActions).toContainEqual(setNotes(mNotes));
});
