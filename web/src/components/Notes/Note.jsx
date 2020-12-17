import React from "react";
import { NavLink } from "react-router-dom";

const Note = ({ repository_name, text, created_at, id, deleteRequestNote }) => {
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
