import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { setUserData } from "../../redux/Auth/auth.reducer";
import { config } from "../../config";
const {
  app: { oauth_github_url },
} = config;

class GithubAuth extends React.Component {
  constructor(props) {
    super(props);
  }

  handleGithubLogin() {
    window.location.replace(oauth_github_url);
  }

  render() {
    return (
      <div>
        <p>authenticated: {this.props.isAuth.toString()}</p>
        <p>login: {this.props.login || "anonymous user"}</p>
        <p>userId: {this.props.userId || "anonymous user"}</p>
        <button onClick={this.handleGithubLogin}>Login with GitHub</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  userId: state.auth.userId,
});

export default withRouter(
  connect(mapStateToProps, { setUserData })(GithubAuth)
);
