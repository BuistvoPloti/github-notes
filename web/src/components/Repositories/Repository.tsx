import React from "react";
import { NavLink } from "react-router-dom";
import forked_clip from "../../assets/images/forked_clip.png";
import starred_clip from "../../assets/images/starred_clip.png";
import { IRepository } from "../../types/types";

interface Props extends IRepository{
  githubUser: boolean,
  deleteRequestRepository: (id: string | number) => void,
}

const Repository: React.FC<Props>= ({
  name,
  stars,
  creator_name,
  fork,
  id,
  deleteRequestRepository,
  githubUser,
  starred,
}) => {
  return (
    <tr>
      <td>
        <div>
          {starred && (
            <img className="repository__starred" src={starred_clip} alt="" />
          )}
          {fork && (
            <img className="repository__forked" src={forked_clip} alt="" />
          )}{" "}
          {name}
        </div>
      </td>
      <td>{stars}</td>
      <td>{creator_name}</td>
      <td>
        <div>
          {!githubUser && (
            <>
              <NavLink
                className="repository__edit"
                to={`/repositories/${id}/edit`}
              >
                Edit
              </NavLink>
              <NavLink
                className="repository__delete"
                to={"#"}
                onClick={() => deleteRequestRepository(id)}
              >
                Delete
              </NavLink>
            </>
          )}

          <NavLink
            className="repository__details"
            to={`/repositories/${githubUser ? creator_name : "anon"}/${
              githubUser ? name : id
            }/details`}
          >
            Details
          </NavLink>
        </div>
      </td>
    </tr>
  );
};

export { Repository };
