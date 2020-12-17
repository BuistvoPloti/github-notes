import React, { Component } from "react";
import { connect } from "react-redux";
import FormComponent from "../Forms/RepositoryFormComponent";
import {
  addRepository,
  requestRepositories,
} from "../../redux/Repository/repository.reducer";
import "../../CommonStyles/NavLettering.css";

class AddRepository extends Component {
  handleSubmit = (name, description, stars, creator_name) => {
    this.props.addRepository({ name, description, stars, creator_name });
  };

  handleSubmitTest = () => {
    this.props.requestRepositories();
  };

  render() {
    return (
      <div>
        <p className="addRepository">Repository -> Add</p>
        <FormComponent
          buttonLabel="Add"
          handleSubmit={this.handleSubmit}
          handleSubmitTest={this.handleSubmitTest}
        />
      </div>
    );
  }
}

export default connect(null, { addRepository, requestRepositories })(
  AddRepository
);
