import React from "react";

const NoteDetails = (props) => {
  const details = props.note;
  return (
    <div>
      <p className="detailsNote">Note -> Details</p>
      <div className="note__detailsContainer">
        <div className="note__detail">
          Related to repository:{" "}
          {details.related_repository && details.related_repository[0].name}
        </div>
        <div className="note__detail">Creator: {details.creator_id || 'anonymous'}</div>
        <div className="note__detail">Text: {details.text}</div>
        <div className="note__detail">Created at: {details.created_at}</div>
      </div>
    </div>
  );
};

export { NoteDetails };
