import React from "react";
import "./App.css";
import "../src/CommonStyles/EntitiesDetails.css";
import "../src/CommonStyles/LayoutContainer.css";
import "../src/CommonStyles/NavLettering.css"; //move styles from here
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
import NavbarContainer from "./components/Navbar/NavbarContainer";
import Preloader from "./components/common/Preloader";
import { initializeApp } from "./redux/app.reducer";
import store from "./redux/store/store";
import { setUserData } from "./redux/Auth/auth.reducer";

class App extends React.Component {
  componentDidMount() {
    console.log("app mounted");
    this.props.initializeApp();
  }

  render() {
    if (this.props.initializedIsAuth === null) {
      return <Preloader />;
    }

    return (
      <div>
        <NavbarContainer />
        <Switch>
          <Route path="/repositories" component={RepositoriesContainer} exact />
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
    );
  }
}

const mapStateToProps = (state) => ({
  initializedIsAuth: state.app.initializedIsAuth,
});

const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp, setUserData })
)(App);

const MainApp = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default MainApp;
