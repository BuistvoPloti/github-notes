import React from "react";
import { Repositories } from "./Repositories";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  deleteRequestRepository,
  requestRepositories,
} from "../../redux/Repository/repository.reducer";

class RepositoriesContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("init: " + this.props.initializedIsAuth);
    this.props.requestRepositories(this.props.initializedIsAuth);
  }

  render() {
    return (
      <>
        <Repositories
          githubUser={this.props.isAuth}
          repositories={this.props.repositories}
          deleteRequestRepository={this.props.deleteRequestRepository}
          isAuth={this.props.isAuth}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    repositories: state.repositoriesPage.repositories,
    isAuth: state.auth.isAuth,
    initializedIsAuth: state.app.initializedIsAuth,
  };
};

export default compose(
  connect(mapStateToProps, { requestRepositories, deleteRequestRepository })
  //withAuthRedirect
)(RepositoriesContainer);
