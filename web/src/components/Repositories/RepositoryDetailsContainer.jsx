import React from "react";
import { repositoriesAPI } from "../../api/api";
import { RepositoryDetails } from "./RepositoryDetails";
import {compose} from "redux";
import {connect} from "react-redux";
import Preloader from "../common/Preloader";

class RepositoryDetailsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repository: null,
    };
  }

  componentDidMount() {
    repositoriesAPI
      .getRepositoryById(this.props.match.params.id, this.props.match.params.user, this.props.initializedIsAuth)
      .then((response) => {
        this.setState({ repository: response.data.repository });
      });
  }

  render() {
    if (!this.state.repository) {
      return <Preloader />;
    }
    return (
      <div>
        <RepositoryDetails repository={this.state.repository} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initializedIsAuth: state.app.initializedIsAuth,
    login: state.auth.login
  };
};

export default compose(
  connect(mapStateToProps, null)
)(RepositoryDetailsContainer);


