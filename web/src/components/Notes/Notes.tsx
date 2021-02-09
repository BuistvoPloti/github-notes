import React from "react";
import { NavLink } from "react-router-dom";
import { INote } from "../../types/types";
import { Note } from "./Note";
import {Emoji} from "../common/Emoji";

type Props = {
  notes: INote[],
  deleteRequestNote: (id: string | number) => void ,
}

const Notes: React.FC<Props> = ({ notes, deleteRequestNote }) => {
  const renderTableData = () => {
    return notes.map((note, index) => {
      return (
        <Note
          id={note.id}
          repository_name={note.related_repository[0].name}
          key={index}
          text={note.text}
          created_at={note.created_at}
          deleteRequestNote={deleteRequestNote}
        />
      );
    });
  };

  return (
    <div className="notes__container">
      <div className="notes__addLinkContainer">
        <NavLink className="notes__add" to="/notes/add">
          <Emoji symbol={"📝"}/>
          New
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
