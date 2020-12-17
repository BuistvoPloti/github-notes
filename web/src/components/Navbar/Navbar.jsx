import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./Navbar.css";
import github_logo from "../../assets/images/github_logo.png";

const Navbar = (props) => {
  const handleLogout = () => {
    props.logout();
    window.location.reload();
  };

  return (
    <div className="navbar__topnav">
      <div>
        <NavLink className="Nav_link" to="/repositories">
          Repositories
        </NavLink>
      </div>
      <div>
        <NavLink className="Nav_link" to="/notes">
          Notes
        </NavLink>
      </div>
      <div className="navbar__login">
        {props.isAuth ? (
          <div>
            <img className="navbar__logo" src={github_logo} alt="" />
            {props.login}{" "}
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

export default withRouter(Navbar);
