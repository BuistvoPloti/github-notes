import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { notesAPI, repositoriesAPI } from "../../api/api";
import "../../CommonStyles/NavLettering.css";
import Preloader from "../common/Preloader";
import { updateNote } from "../../redux/Note";
import { INote, IRepository, MatchParams } from "../../types/types";
import { RouteComponentProps } from "react-router";
import { NoteForm } from "../Forms/NoteForm";
import { AppStateType } from "../../redux/rootReducer";
import { isEmptyObject } from "../../utils/object-helpers";

type Props = DispatchProps & RouteComponentProps<MatchParams> & ReturnType<typeof stateToProps>;

const EditNote: React.FC<Props> = ({ isAuth, updateNote, ...props }) => {
  const [note, setNote] = useState<INote>({} as INote);
  const [repositoriesInfo, setRepositoriesInfo] = useState<IRepository[]>([]);
  const [pending, setPending] = useState<boolean>(false);

  useEffect(() => {
    Promise.all([
      notesAPI.getNoteById(String(props.match.params.id)),
      repositoriesAPI.getRepositories(isAuth),
    ]).then(([noteResponse, repositoriesInfo]) => {
      setNote(noteResponse.data.data.note);
      setRepositoriesInfo(repositoriesInfo);
      setPending(true);
    });
  }, []);

  const handleSubmit = (
    repository_id: number | string,
    creator_id: (string | null) = null,
    text: string,
  ) => {
    updateNote({
      repository_id,
      creator_id,
      text,
      id: props.match.params.id,
    });
  };

  return (
    <div>
      <p className="editRepository">{"Repository -> Edit"}</p>
      <Preloader show={!(pending && !isEmptyObject(note))}>
        <div>
          <NoteForm
            buttonLabel="Update"
            repositoriesInfo={repositoriesInfo}
            note={note}
            mode={"edit"}
            text={note.text}
            handleSubmit={handleSubmit}
          />
        </div>
      </Preloader>
    </div>
  );
};

const stateToProps = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

type DispatchProps = {
  updateNote: (note: Partial<INote>) => void
}

const dispatchToProps: DispatchProps = {
  updateNote,
};

export default connect(stateToProps, dispatchToProps)(EditNote);
