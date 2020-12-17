import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Notes } from "./Notes";
import { deleteRequestNote, requestNotes } from "../../redux/Note/note.reducer";

class NotesContainer extends React.Component {
  componentDidMount() {
    this.props.requestNotes();
  }

  render() {
    return (
      <>
        <Notes notes={this.props.notes} deleteRequestNote={this.props.deleteRequestNote} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.notesPage.notes,
  };
};

export default compose(
  connect(mapStateToProps, { requestNotes, deleteRequestNote })
)(NotesContainer);
