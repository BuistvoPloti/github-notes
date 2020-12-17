import React from "react";
import { Repository } from "./Repository";
/*import "./Repositories.css";*/
import { NavLink } from "react-router-dom";

const Repositories = (props) => {
  function renderTableData() {
    return props.repositories.map((repo, index) => {
      return (
        <Repository
          id={repo.id}
          key={index}
          name={repo.name}
          githubUser={props.githubUser}
          /*description={r.description}*/
          stars={repo.stars || "no stars"}
          starred={repo.starred}
          creator_name={repo.creator_name}
          fork={repo.fork}
          /*created_at= {r.created_at}*/
          deleteRequestRepository={props.deleteRequestRepository}
        />
      );
    });
  }

  return (
    <div className="repositories__container">
      <div className="repositories__addLinkContainer">
        {!props.isAuth && (
          <>
            <NavLink className="repositories__add" to="/repositories/add">
              Add
            </NavLink>
          </>
        )}
      </div>
      <table className="repositories__table">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Stars</th>
            <th>Creator Name</th>
            <th>Actions</th>
          </tr>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
};

export { Repositories };
