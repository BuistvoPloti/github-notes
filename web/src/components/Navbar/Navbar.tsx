import React, {ComponentType} from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./Navbar.css";
import github_logo from "../../assets/images/github_logo.png";
import { RouteComponentProps } from 'react-router-dom';
import { AppStateType } from "../../redux/rootReducer";
import { logout } from "../../redux/Auth/auth.reducer";
import { compose } from "redux";
import { connect } from "react-redux";

type Props = DispatchProps & ReturnType<typeof stateToProps> & RouteComponentProps<typeof stateToProps>;

const Navbar: React.FC<Props> = ({ logout, isAuth, login, ...props }) => {
  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className="navbar__topnav">
      <div>
        <NavLink className="Nav_link left" to="/repositories">
          Repositories
        </NavLink>
      </div>
      <div>
        <NavLink className="Nav_link right" to="/notes">
          Notes
        </NavLink>
      </div>
      <div className="navbar__login">
        {isAuth ? (
          <div>
            <img className="navbar__logo" src={github_logo} alt="" />
            {login}{" "}
            <div className="dropdown">
              <button disabled={true} className="dropdown-btn">
                ▼
              </button>
              <div className="dropdown-content">
                <button
                  className="dropdown-btn"
                  onClick={() => props.history.push("/login")}
                >
                  User info
                </button>
                <button className="dropdown-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <NavLink className="navbar__login-btn" to="/login"><img className="navbar__logo" src={github_logo} alt="" />Login</NavLink>
        )}
      </div>
    </div>
  );
};

type DispatchProps = {
  logout: () => void
}

const stateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  userId: state.auth.userId,
});

const dispatchToProps: DispatchProps = {
  logout,
};

export default compose<ComponentType<any>>(
  withRouter,
  connect(stateToProps, dispatchToProps)
)(Navbar);
