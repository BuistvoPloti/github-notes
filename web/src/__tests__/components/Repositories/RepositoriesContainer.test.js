import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../../redux/rootReducer";
import RepositoriesContainer
  from "../../../components/Repositories/RepositoriesContainer";

const initialState = {
  auth: {
    isAuth: false,
  },
  repositoriesPage: {
    repositories: [{}],
  },
  app: {
    initializedIsAuth: true,
  }
};
const store = createStore(rootReducer, initialState);

const Wrapper = ({ children }) => {
  return <Provider store={store}>
    <Router>
      { children }
    </Router>
  </Provider>
};

describe("components/Repositories/RepositoriesContainer", () => {
  test("renders RepositoriesContainer component", () => {
    const mLoadReposirotires = jest.fn().mockReturnValue([{}, {}]);
    render(<Wrapper>
      <RepositoriesContainer props={ initialState } loadRepositories={ mLoadReposirotires } />
    </Wrapper>);
    screen.getByText("Name");
    screen.getByText("New");
  });
});
