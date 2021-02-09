import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { authReducer } from "../../../redux/Auth";
import EditNote from "../../../components/Notes/EditNote";
import { notesAPI, repositoriesAPI } from "../../../api/api";

const initialState = {
  auth: {
    isAuth: false,
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

describe("components/Notes/EditNote", () => {
  test("renders EditNote component", async () => {
    const mNoteText = "sampleNoteText";
    const mRepositoryName = "sampleRepoText";
    const mNoteResponse = {
      data: {
        data: {
          note: {
            text: mNoteText,
            related_repository: [{ id: 17 }]
          }
        }
      }
    };
    const mGetNoteById = jest
      .spyOn(notesAPI, "getNoteById")
      .mockImplementation(() =>
        Promise.resolve(mNoteResponse)
      );
    const mGetRepositories = jest.spyOn(repositoriesAPI, "getRepositories")
      .mockImplementation(() => Promise.resolve([{name: mRepositoryName}]));
    const mRouterProps = { params: { id:555 } };
    render(<Wrapper>
      <EditNote props={ initialState.auth } match={ mRouterProps }/>
    </Wrapper>);
    expect(mGetNoteById).toBeCalledTimes(1);
    expect(mGetRepositories).toBeCalledTimes(1);
    await screen.findByText(mNoteText);
    await screen.findByText(mRepositoryName);
  });
});
