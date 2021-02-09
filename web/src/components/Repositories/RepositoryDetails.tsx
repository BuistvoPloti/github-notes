import React from "react";
import { IRepository } from "../../types/types";

type Props = {
  repository: IRepository,
}

const RepositoryDetails: React.FC<Props> = ({ repository }) => {
  return (
    <div>
      <p className="detailsRepository">{"Repository -> Details"}</p>
      <div className="repository__detailsContainer">
        <div className="repository__detail">Name: {repository.name}</div>
        <div className="repository__detail">
          Description: {repository.description || "no description" }
        </div>
        <div className="repository__detail">
          Stars: {repository.stars || repository.stargazers_count}
        </div>
        <div className="repository__detail">
          Creator name:{" "}
          {repository.owner ? repository.owner.login : repository.creator_name}
        </div>
        <div className="repository__detail">
          Created at: {repository.created_at}
        </div>
      </div>
    </div>
  );
};

export { RepositoryDetails };
