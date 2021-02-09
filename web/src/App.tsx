import React, { useEffect } from "react";
import "./App.css";
import "../src/CommonStyles/EntitiesDetails.css";
import "../src/CommonStyles/LayoutContainer.css";
import "../src/CommonStyles/NavLettering.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect, Provider } from "react-redux";
import RepositoriesContainer from "./components/Repositories/RepositoriesContainer";
import AddRepository from "./components/Repositories/AddRepository";
import EditRepository from "./components/Repositories/EditRepository";
import RepositoryDetailsContainer from "./components/Repositories/RepositoryDetailsContainer";
import NotesContainer from "./components/Notes/NotesContainer";
import NoteDetailsContainer from "./components/Notes/NoteDetailsContainer";
import AddNote from "./components/Notes/AddNote";
import EditNote from "./components/Notes/EditNote";
import GithubAuth from "./components/Forms/GithubAuth";
import Preloader from "./components/common/Preloader";
import { initializeApplication } from "./redux/App/app.actions";
import store from "./redux/store/store";
import Navbar from "./components/Navbar/Navbar";
import { DispatchProps, RootState } from "./types/app.types";
import { Home } from "./components/common/home";

type Props = ReturnType<typeof stateToProps> & DispatchProps

const App: React.FC<Props> = ({ initializeApplication, initializedIsAuth }) => {
  useEffect(() => {
    initializeApplication();
  }, []);

  return (
    <>
      <Preloader show={initializedIsAuth === null}>
        <div>
          <Navbar />
          <Switch>
            <Route
              path="/"
              component={Home}
              exact
            />
            <Route
              path="/repositories"
              component={RepositoriesContainer}
              exact
            />
            <Route
              path="/repositories/:user/:id/details"
              component={RepositoryDetailsContainer}
            />
            <Route path="/repositories/add" component={AddRepository} />
            <Route path="/repositories/:id/edit" component={EditRepository} />
            <Route path="/notes" component={NotesContainer} exact />
            <Route
              path="/notes/:id/details"
              component={NoteDetailsContainer}
              exact
            />
            <Route path="/notes/add" component={AddNote} exact />
            <Route path="/notes/:id/edit" component={EditNote} />
            <Route path="/login" component={GithubAuth} exact />
          </Switch>
        </div>
      </Preloader>
    </>
  );
};

const stateToProps = (state: RootState) => ({
  initializedIsAuth: state.app.initializedIsAuth,
});

const dispatchToProps: DispatchProps = {
  initializeApplication,
};

const AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(stateToProps, dispatchToProps)
)(App);

const MainApp: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default MainApp;
