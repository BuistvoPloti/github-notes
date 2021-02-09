import React from "react";
import { NavLink } from "react-router-dom";
import {INote} from "../../types/types";

interface Props extends Partial<INote>{
  repository_name: string,
  id: number | string,
  deleteRequestNote: (id: string | number) => void,
}

const Note: React.FC<Props> = ({ repository_name, text, created_at, id, deleteRequestNote }) => {
  return (
    <tr>
      <td>{repository_name}</td>
      <td>{text}</td>
      <td>{created_at}</td>
      <td>
        <div>
          <NavLink className="note__edit" to={`/notes/${id}/edit`}>
            Edit
          </NavLink>
          <NavLink
            className="note__delete"
            to={"#"}
            onClick={() => deleteRequestNote(id)}
          >
            Delete
          </NavLink>
          <NavLink className="note__details" to={`/notes/${id}/details`}>
            Details
          </NavLink>
        </div>
      </td>
    </tr>
  );
};

export { Note };
