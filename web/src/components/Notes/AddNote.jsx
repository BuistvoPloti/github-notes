import React from "react";
import { connect } from "react-redux";
import "../../CommonStyles/NavLettering.css";
import { addNote, requestNotes } from "../../redux/Note/note.reducer";
import NoteFormComponent from "../Forms/NoteFormComponent";
import { repositoriesAPI } from "../../api/api";
import Preloader from "../common/Preloader";

class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = { repositories_info: [] };
  }

  componentDidMount() {
    repositoriesAPI.getRepositories(this.props.isAuth).then((repositories) => {
      this.setState({
        repositories_info: repositories,
      });
    });
  }

  handleSubmit = (repository_id, creator_id, text) => {
    this.props.addNote({ repository_id, text, creator_id });
  };

  render() {
    return (
      <div>
        <p className="addRepository">Note -> Add</p>
        {this.state.repositories_info.length ? (
          <NoteFormComponent
            buttonLabel="Add"
            repositories_info={this.state.repositories_info}
            mode={"add"}
            handleSubmit={this.handleSubmit}
          />
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

export default connect(mapStateToProps, { requestNotes, addNote })(AddNote);
