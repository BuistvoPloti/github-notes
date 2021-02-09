import React, { useState, useEffect  } from "react";
import { connect } from "react-redux";
import RepositoryForm from "../Forms/RepositoryForm";
import { repositoriesAPI } from "../../api/api";
import { updateRepository } from "../../redux/Repository";
import "../../CommonStyles/NavLettering.css";
import Preloader from "../common/Preloader";
import { IRepository, LocalFetchDataWrapper, MatchParams } from "../../types/types";
import { RouteComponentProps } from "react-router";

type Props =  RouteComponentProps<MatchParams> & DispatchProps;

const EditRepository: React.FC<Props> = ({ updateRepository, ...props }) => {
  const [repository, setRepository] = useState<LocalFetchDataWrapper<IRepository>>({ data: undefined });

  useEffect(() => {
    repositoriesAPI.getRepositoryById(String(props.match.params.id))
      .then((repositoryResponse) => {
        setRepository({ data: repositoryResponse.data.data.repository });
      })
  },[]);

  const handleSubmit = (repository: Partial<IRepository>) => {
    updateRepository({ ...repository, id: props.match.params.id });
};

  return (
    <div>
      <p className="editRepository">{"Repository -> Edit"}</p>
      <Preloader show={ Boolean(repository.data) }>
        <RepositoryForm
          name={repository.data?.name}
          description={repository.data?.description}
          stars={repository.data?.stars}
          creator_name={repository.data?.creator_name}
          created_at={repository.data?.created_at}
          buttonLabel="Update"
          handleSubmit={handleSubmit} />
      </Preloader>
    </div>
  )
};

type DispatchProps = {
  updateRepository: (repository: Partial<IRepository>) => void
}

const dispatchToProps: DispatchProps = {
  updateRepository,
};

export default connect<null, DispatchProps>(null, dispatchToProps)(
  EditRepository
);


