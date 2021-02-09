import React, { useState, useEffect, ComponentType } from "react";
import "./FormComponent.css";
import { RouteComponentProps, withRouter } from "react-router";
import { compose } from "redux";
import { connect } from "react-redux";
import { IRepository, INote } from "../../types/types";
import {AppStateType} from "../../redux/rootReducer";

type OwnProps = {
  buttonLabel: string;
  mode: string;
  handleSubmit: (
    repository_id: number | string,
    creator_id: string | null,
    text: string
  ) => void;
  repositoriesInfo: IRepository[];
  text?: string;
  note?: INote;
}

type Props = OwnProps & RouteComponentProps<any> & ReturnType<typeof stateToProps>;

type LocalState = {
  selectedRepository: string | number | undefined;
  noteText: string,
  noteTextError: string,
}

const NoteFormComponent: React.FC<Props> = (props) => {
  const [state, setState] = useState<LocalState>({
    selectedRepository: undefined,
    noteText: "",
    noteTextError: "",
  });

  useEffect(() => {
    if (props.mode === "add") {
      setState({
        ...state,
        selectedRepository: props.repositoriesInfo[0].id,
      });
    } else if (props.mode === "edit") {
      setState({
        ...state,
        selectedRepository: defineSelectedRepository(),
        noteText: props.text as string,
      });
    }
  }, []);

  const defineSelectedRepository = () => {
    const note: INote | undefined = props.note;
    if (note) {
      return note.related_repository[0].id;
    }
    return undefined;
  };

  const validate = () => {
    if(state.noteText.length < 3) {
      setState({...state, noteTextError: "length < 3"});
      return;
    } else {
      setState({...state, noteTextError: ""})
    }

    return true;
  };

  const handleChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const name: string = target.name;
    setState({ ...state, [name]: target.value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const isValid = validate();
    if(!isValid) {
      return;
    }
    const creator_id: string | null = props.isAuth ? props.login : null;
    if (props.mode === "add") {
      props.handleSubmit(state.selectedRepository as number | string, creator_id, state.noteText);
    } else if (props.mode === "edit") {
      props.handleSubmit(state.selectedRepository as number | string, creator_id, state.noteText);
    }
    props.history.goBack();
  };

  return (
    <div className="form__container">
      <form onSubmit={handleSubmit}>
        <div className="form__row">
          <label className="form__label" htmlFor="name">
            Repository
          </label>
          <div className="form__element">
            <select value={state.selectedRepository} className="form__input" name="selectedRepository" onChange={handleChange}>
              {props.repositoriesInfo.map((info, index) => {
                return (
                  <option
                    title={"id:" + info.id}
                    key={index}
                    value={info.id}
                  >
                    {info.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="description">
            Text
          </label>
          <div className="form__element">
              <textarea
                required
                name="noteText"
                className="form__textarea"
                defaultValue={state.noteText}
                cols={28}
                onChange={handleChange}
                onBlur={validate}
              />
          </div>
          <div className="form__error">{state.noteTextError}</div>
        </div>
        <div className="form__action">
          <button
            disabled={!props.repositoriesInfo.length}
            className="form__button"
          >
            {props.buttonLabel}
          </button>
        </div>
      </form>
    </div>
  )
};

const stateToProps = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  };
};

export const NoteForm = compose<ComponentType<OwnProps>>(
  withRouter,
  connect(stateToProps, null)
)(NoteFormComponent);
