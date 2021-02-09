import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../../CommonStyles/NavLettering.css";
import { repositoriesAPI } from "../../api/api";
import Preloader from "../common/Preloader";
import { addNote, loadNotes } from "../../redux/Note/note.actions";
import { INote, IRepository } from "../../types/types";
import { NoteForm } from "../Forms/NoteForm";
import { AppStateType } from "../../redux/rootReducer";

type DispatchProps = {
  loadNotes: () => void
  addNote: (note: Partial<INote>) => void
}

type Props = DispatchProps & ReturnType<typeof stateToProps>;

const AddNote: React.FC<Props> = ({ isAuth, addNote, }) => {
  const [repositoriesInfo, setRepositoriesInfo] = useState<Array<IRepository>>([]);

  useEffect(() => {
    repositoriesAPI
      .getRepositories(isAuth)
      .then((repositories: IRepository[]) => {
        setRepositoriesInfo(repositories);
      });
  }, []);

  const handleSubmit = (
    repository_id: number | string,
    creator_id: string | null,
    text: string
  ) => {
    addNote({ repository_id, text, creator_id });
  };

  return (
    <div>
      <p className="addRepository">{"Note -> Add"}</p>
      <Preloader show={!repositoriesInfo.length}>
        <NoteForm
          buttonLabel="Add"
          repositoriesInfo={repositoriesInfo}
          mode={"add"}
          handleSubmit={handleSubmit}
        />
      </Preloader>
    </div>
  )
};

const stateToProps = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

const mapDispatchToProps:DispatchProps = {
  loadNotes,
  addNote,
};

export default connect(stateToProps, mapDispatchToProps)(AddNote);
