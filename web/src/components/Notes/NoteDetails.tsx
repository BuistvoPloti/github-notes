import React from "react";
import { INote } from "../../types/types";

type Props = {
  note: INote,
}

const NoteDetails: React.FC<Props> = ({ note }) => {
  return (
    <div>
      <p className="detailsNote">{"Note -> Details"}</p>
      <div className="note__detailsContainer">
        <div className="note__detail">
          Related to repository:{" "}
          {note.related_repository && note.related_repository[0].name}
        </div>
        <div className="note__detail">Creator: {note.creator_id || 'anonymous'}</div>
        <div className="note__detail">Text: {note.text}</div>
        <div className="note__detail">Created at: {note.created_at}</div>
      </div>
    </div>
  );
};

export { NoteDetails };
