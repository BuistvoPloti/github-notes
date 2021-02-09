import React from "react";
import { Repository } from "./Repository";
import { NavLink } from "react-router-dom";
import { IRepository } from "../../types/types";
import {Emoji} from "../common/Emoji";

type Props = {
  repositories: IRepository[],
  isAuth: boolean,
  githubUser: boolean,
  deleteRequestRepository: (id: string | number) => void,
}

const Repositories: React.FC<Props> = ({ repositories, githubUser, deleteRequestRepository, isAuth }) => {
  function renderTableData() {
    return repositories.map((repo, index) => {
      return (
        <Repository
          id={repo.id}
          key={index}
          name={repo.name}
          githubUser={githubUser}
          description={repo.description}
          stars={repo.stars || "no stars"}
          starred={repo.starred}
          creator_name={repo.creator_name}
          fork={repo.fork}
          created_at={repo.created_at}
          deleteRequestRepository={deleteRequestRepository}
        />
      );
    });
  }

  return (
    <div className="repositories__container">
      <div className="repositories__addLinkContainer">
        {!isAuth && (
          <>
            <NavLink className="repositories__add" to="/repositories/add">
              <Emoji symbol={"📂"}/>
                New
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
