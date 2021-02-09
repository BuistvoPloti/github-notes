import React, { useState, useEffect } from "react";
import { repositoriesAPI } from "../../api/api";
import { compose} from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from 'react-router';
import Preloader from "../common/Preloader";
import { RepositoryDetails } from "./RepositoryDetails";
import { MatchParams, IRepository } from "../../types/types";
import { LocalFetchDataWrapper } from "../../types/types";
import { AppStateType } from "../../redux/rootReducer";

interface Props extends RouteComponentProps<MatchParams> {
  initializedIsAuth: boolean,
}

const RepositoryDetailsContainer: React.FC<Props> = ({ initializedIsAuth, ...props }) => {
  const [repository, setRepository] = useState<LocalFetchDataWrapper<IRepository>>({ data: undefined });

  useEffect(() => {
    repositoriesAPI
      .getRepositoryById(
        String(props.match.params.id),
        props.match.params.user,
        initializedIsAuth)
      .then((fetchedRepository)=>{
        setRepository({ data: fetchedRepository.data.data.repository });
    })
  }, []);

  return repository.data ? (
    <div>
      <RepositoryDetails repository = { repository.data } />
    </div>
  ) : (
    <Preloader />
  );
};

const stateToProps = (state: AppStateType) => ({
  initializedIsAuth: state.app.initializedIsAuth,
  login: state.auth.login
});

export default compose(
  connect(stateToProps, null)
)(RepositoryDetailsContainer);


