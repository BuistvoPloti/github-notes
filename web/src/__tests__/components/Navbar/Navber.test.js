import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from "../../../components/Navbar/Navbar";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { authReducer } from "../../../redux/Auth";

const initialState = {
  auth: {
    isAuth: true,
    login: "john123",
    userId: 1234,
  },
};
const store = createStore(authReducer, initialState);

const Wrapper = ({ children }) => {
  return <Provider store={store}>
    <Router>
      { children }
    </Router>
  </Provider>
};

describe("components/Navbar/Navbar", () => {
  test("renders Navbar component", () => {
    render(<Wrapper>
      <Navbar props={ initialState.auth }/>
    </Wrapper>);
    screen.getByText("john123");
    screen.getByText("Logout");
  });
});
