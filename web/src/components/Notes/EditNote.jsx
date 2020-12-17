import React from "react";
import { connect } from "react-redux";
import { notesAPI, repositoriesAPI } from "../../api/api";
import { compose } from "redux";
import "../../CommonStyles/NavLettering.css";
import NoteFormComponent from "../Forms/NoteFormComponent";
import { updateNote } from "../../redux/Note/note.reducer";
import Preloader from "../common/Preloader";

class EditNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: [],
      repositories_info: [],
    };
  }

  componentDidMount() {
    notesAPI.getNoteById(this.props.match.params.id).then((response) => {
      this.setState({ note: [response.data.note] });
    });

    repositoriesAPI.getRepositories(this.props.isAuth).then((repositories) => {
      this.setState({
        repositories_info: repositories,
      });
    });
  }

  handleSubmit = (repository_id, text, creator_id) => {
    this.props.updateNote({
      repository_id,
      creator_id,
      text,
      id: this.props.match.params.id,
    });
  };

  render() {
    return (
      <div>
        <p className="editRepository">Repository -> Edit</p>
        {this.state.note.length && this.state.repositories_info.length ? (
          <div>
            <NoteFormComponent
              buttonLabel="Update" //combine with mode?
              repositories_info={this.state.repositories_info}
              note={this.state.note}
              mode={"edit"}
              text={this.state.note[0].text}
              handleSubmit={this.handleSubmit}
            />
          </div>
        ) : (
          <Preloader/>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};


export default compose(connect(mapStateToProps, { updateNote }))(EditNote);
