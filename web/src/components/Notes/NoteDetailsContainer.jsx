import React from "react";
import { notesAPI } from "../../api/api";
import { NoteDetails } from "./NoteDetails";

class NoteDetailsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: 1,
    };
  }

  componentDidMount() {
    notesAPI.getNoteById(this.props.match.params.id).then((response) => {
      this.setState({ note: response.data.note });
    });
  }

  render() {
    return (
      <div>
        <NoteDetails note={this.state.note} />
      </div>
    );
  }
}

export default NoteDetailsContainer;
