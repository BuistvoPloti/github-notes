import React from "react";
import { connect } from "react-redux";
import FormComponent from "../Forms/RepositoryFormComponent";
import { repositoriesAPI } from "../../api/api";
import { updateRepository } from "../../redux/Repository/repository.reducer";
import { compose } from "redux";
import "../../CommonStyles/NavLettering.css";

class EditRepository extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repository: 1,
    };
  }

  componentDidMount() {
    repositoriesAPI
      .getRepositoryById(this.props.match.params.id)
      .then((response) => {
        this.setState({ repository: response.data.repository });
      });
  }

  handleSubmit = (name, description, stars, creator_name, created_at) => {
    this.props.updateRepository({
      name,
      description,
      stars,
      creator_name,
      created_at,
      id: this.props.match.params.id, //TODO refactor
    });
  };

  render() {
    return (
      <div>
        <p className="editRepository">Repository -> Edit</p>
        <FormComponent
          name={this.state.repository.name}
          description={this.state.repository.description}
          stars={this.state.repository.stars}
          creator_name={this.state.repository.creator_name}
          created_at={this.state.repository.created_at}
          buttonLabel="Update"
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default compose(connect(null, { updateRepository }))(EditRepository);


