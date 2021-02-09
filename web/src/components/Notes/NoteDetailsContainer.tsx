import React, { useState, useEffect } from "react";
import { notesAPI } from "../../api/api";
import Preloader from "../common/Preloader";
import {NoteDetails} from "./NoteDetails";
import {LocalFetchDataWrapper, MatchParams, INote, ServerResponseWithData} from "../../types/types";
import {RouteComponentProps} from "react-router";

type Props = & RouteComponentProps<MatchParams>

const NoteDetailsContainer: React.FC<Props> = (props) => {
  const [note, setNote] = useState<LocalFetchDataWrapper<INote>>({ data: undefined });

  useEffect(() => {
    notesAPI.getNoteById(String(props.match.params.id))
      .then((response: ServerResponseWithData<INote>) => {
        setNote({ data: response.data.data.note });
      });
  }, []);

  return note.data ? (
    <div>
      <NoteDetails note = { note.data } />
    </div>
  ) : (
    <Preloader />
  );
};

export default NoteDetailsContainer;
