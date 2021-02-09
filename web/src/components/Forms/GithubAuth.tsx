import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import "./GithubAuth.css"
import anonymousAvatar from "../../assets/images/avatar-anonymous.jpg"
import { logout } from "../../redux/Auth/auth.reducer";
import { config } from "../../config";
const {
  app: { oauth_github_url },
} = config;

type Props = DispatchProps & ReturnType<typeof stateToProps>;

const GithubAuth: React.FC<Props> = (props) =>{
  const handleGithubLogin = () => {
    window.location.replace(String(oauth_github_url));
  };

  const handleLogout = () => {
    props.logout();
    window.location.reload();
  };

    return (
      <div className="login__container">
        <img className="login__avatar" src={props.avatar_url || anonymousAvatar} alt=""/>
        <div className="login__info">{props.login || "Anonymous user"}</div>
        {props.isAuth
          ? <button className="login__signout" onClick={handleLogout}>Logout</button>
          : <button className="login__signin" onClick={handleGithubLogin}>Login with GitHub</button>
        }
      </div>
    );
};

type RootState = {
  auth: {
    isAuth: boolean,
    login: string,
    userId: number | string,
    avatar_url: string | undefined,
  }
}

type DispatchProps = {
  logout: () => void
}

const stateToProps = (state: RootState) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  userId: state.auth.userId,
  avatar_url: state.auth.avatar_url,
});

const mapDispatchToProps: DispatchProps = {
  logout,
};

export default withRouter(
  connect(stateToProps, mapDispatchToProps)(GithubAuth)
);
