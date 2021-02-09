import React from "react";
import { connect } from "react-redux";
import RepositoryForm from "../Forms/RepositoryForm";
import {
  addRepository,
} from "../../redux/Repository";
import "../../CommonStyles/NavLettering.css";
import { IRepository } from "../../types/types";

const AddRepository: React.FC<DispatchProps> = ({ addRepository }) => {
  const handleSubmit = (repository: Partial<IRepository>) => {
    addRepository(repository);
  };

  return (
    <div>
      <p className="addRepository">{"Repository -> Add"}</p>
      <RepositoryForm
        buttonLabel="Add"
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

type DispatchProps = {
  addRepository: (repository: Partial<IRepository>) => void
}

const dispatchToProps: DispatchProps = {
  addRepository,
};

export default connect<null, DispatchProps>(
  null,
  dispatchToProps
)(AddRepository);
