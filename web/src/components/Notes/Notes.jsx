import React from "react";
import { NavLink } from "react-router-dom";
import { Note } from "./Note";

const Notes = (props) => {
  //may add some filter checkboxes to show/hide id
  function renderTableData() {
    return props.notes.map((note, index) => {
      return (
        <Note
          id={note.id}
          repository_name={note.related_repository[0].name}
          key={index}
          text={note.text}
          created_at={note.created_at}
          deleteRequestNote={props.deleteRequestNote}
        />
      );
    });
  }

  return (
    <div className="notes__container">
      <div className="notes__addLinkContainer">
        <NavLink className="notes__add" to="/notes/add">
          Add
        </NavLink>
      </div>
      <table className="notes__table">
        <tbody>
          <tr>
            <th>Related to</th>
            <th>Text</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
};

export { Notes };
