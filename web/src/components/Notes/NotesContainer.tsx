import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Notes } from "./Notes";
import { loadNotes } from "../../redux/Note/note.actions";
import { deleteNote } from "../../redux/Note";
import Preloader from "../common/Preloader";
import { AppStateType } from "../../redux/rootReducer";

type DispatchProps = {
  loadNotes: () => void
  deleteNote: (note_id: number | string) => void
}

type Props = DispatchProps & ReturnType<typeof stateToProps>;

const NotesContainer: React.FC<Props> = ({ notes, loadNotes, deleteNote }) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    loadNotes();
    setLoaded(true);
  }, []);

  return (
    <Preloader show={!loaded}>
      <Notes notes={notes} deleteRequestNote={deleteNote} />
    </Preloader>
  );
};

const stateToProps = (state: AppStateType) => {
  return {
    notes: state.notesPage.notes,
  };
};

const dispatchToProps:DispatchProps = {
  loadNotes,
  deleteNote,
};

export default compose(
  connect(stateToProps, dispatchToProps)
)(NotesContainer);
