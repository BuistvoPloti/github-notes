import React from "react";

const RepositoryDetails = (props) => {
  const details = props.repository;
  //const {repository:{details}} = props   might use it instead.

  return (
    <div>
      <p className="detailsRepository">Repository -> Details</p>
      <div className="repository__detailsContainer">
        <div className="repository__detail">Name: {details.name}</div>
        <div className="repository__detail">
          Description: {details.description || "no description" }
        </div>
        <div className="repository__detail">
          Stars: {details.stars || details.stargazers_count}
        </div>
        <div className="repository__detail">
          Creator name:{" "}
          {details.owner ? details.owner.login : details.creator_name}
        </div>
        <div className="repository__detail">
          Created at: {details.created_at}
        </div>
      </div>
    </div>
  );
};

export { RepositoryDetails };
