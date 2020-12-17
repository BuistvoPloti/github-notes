import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import { logout, setUserData } from "../../redux/Auth/auth.reducer";

class NavbarContainer extends Component {
  constructor(props) {
    super(props);
    //this.props.setUserData();//peresmotret' dannoe reshenie
  }

  render() {
    return <Navbar {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  userId: state.auth.userId,
});

export default connect(mapStateToProps, { setUserData, logout })(
  NavbarContainer
);
