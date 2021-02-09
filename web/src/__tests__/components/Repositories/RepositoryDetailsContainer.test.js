import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import rootReducer from "../../../redux/rootReducer";
import RepositoryDetailsContainer
  from "../../../components/Repositories/RepositoryDetailsContainer";
import { BrowserRouter as Router } from "react-router-dom";
import { repositoriesAPI } from "../../../api/api";
import { waitFor } from "@testing-library/react";

const initialState = {
  auth: {
    login: "john123",
  },
  app: {
    initializedIsAuth: true
  },
};
const store = createStore(rootReducer, initialState);

const Wrapper = ({ children }) => {
  return <Provider store={store}>
    <Router>
      { children }
    </Router>
  </Provider>
};

describe("components/Repositories/RepositoryDetailsContainer", () => {
  test("renders RepositoryDetailsContainer component", async () => {
    jest.useFakeTimers();
    const mRepoName = "repo123";
    const mRepositoryResponse = {
      data: {
        data: {
          repository: {
            name: mRepoName
          }
        }
      }
    };
    const mGetRepository = jest.spyOn(repositoriesAPI, "getRepositoryById")
      .mockImplementation(() => Promise.resolve(mRepositoryResponse));
    const mRouterProps = { params: { id:555 } };
    render(<Wrapper>
      <RepositoryDetailsContainer props={ initialState.auth } match={ mRouterProps }/>
    </Wrapper>);
    expect(mGetRepository).toBeCalledTimes(1);
    await screen.getByRole("img");
    await waitFor(() =>screen.getByText(/repo123/i));
  });
});
