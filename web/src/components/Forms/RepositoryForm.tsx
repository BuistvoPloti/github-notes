import React, { useState } from "react";
import "./FormComponent.css";
import {RouteComponentProps, withRouter} from "react-router";
import {IRepository} from "../../types/types";

type LocalStateVariables = {
  name: string,
  description:  string
  stars: number | string,
  creator_name:  string,
}

type LocalStateErrors = {
  errors: & LocalStateVariables,
}

type LocalState = LocalStateVariables & LocalStateErrors;

type IncomeProps = {
  buttonLabel: string,
  handleSubmit: (repository: Partial<IRepository>) => void,
} & Partial<IRepository>

type Props = IncomeProps & RouteComponentProps<any>;

const RepositoryForm: React.FC<Props> = (props) => {
  const [state, setState] = useState<LocalState>({
    name: props.name || "",
    description:  props.description || "",
    stars:  props.stars || "",
    creator_name:  props.creator_name || "",
    errors: {
      name: "",
      description: "",
      stars: "",
      creator_name: "",
    },
  });

  const handleChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    setState({ ...state, [name]: target.value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const isValid = checkIfFormValid();
    if (!isValid) {
      return;
    }
    const repository = {
      name: state.name,
      description: state.description,
      stars: state.stars,
      creator_name: state.creator_name,
    };
    props.handleSubmit(repository);
    props.history.goBack();
  };

  const validateName = (key: string) => {
    if (key === "name") {
      const errorText = "wrong length";
      const condition =
        state[key].length < 2 || state[key].length > 100;
      handleValidation(key, errorText, condition);
    }
  };

  const validateStars = (key: number | string) => {
    if (key === "stars") {
      const errorText = "wrong value";
      const keyToNumber = Number(state[key]);
      const condition =
        !Number.isInteger(keyToNumber)
        || keyToNumber > Number.MAX_VALUE
        || keyToNumber < 0
        || !state[key];
      handleValidation(key, errorText, condition);
    }
  };

  const validateDescription = (key: string) => {
    if (key === "description") {
      const errorText = "Too short description";
      const condition =
        state[key].length < 2 || state[key].length > 2000;
      handleValidation(key, errorText, condition);
    }
  };

  const validateCreatorName = (key: string) => {
    if (key === "creator_name") {
      const errorText = "Too short name";
      const condition =
       state[key].length <= 1 || state[key].length > 144;
      handleValidation(key, errorText, condition);
    }
  };

  const pickValidateOptions = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    validationMethods.forEach((method) => method(target.name));
  };

  const setValidationError = (fieldName: string, errorText = "") => {
    const errors = state.errors;
    setState({ ...state, errors: { ...errors, [fieldName]: errorText } });
  };

  const checkIfFormValid = () => {
    const errors: any = state.errors;
    for (const error in errors) {
      if (errors[error].length) return false;
    }
    return true;
  };

  const handleValidation = (key: string, errorText: string, condition: boolean) => {
    if (condition) {
      setValidationError(key, errorText);
    } else {
      setValidationError(key);
    }
  };

  const validationMethods = [
      validateName,
      validateStars,
      validateDescription,
      validateCreatorName
    ];

  return (
    <div className="form__container">
      <form onSubmit={handleSubmit}>
        <div className="form__row">
          <label className="form__label" htmlFor="name">
            Name
          </label>
          <div className="form__element">
            <input
              required
              className="form__input"
              name="name"
              defaultValue={state.name}
              type="text"
              onChange={handleChange}
              onBlur={pickValidateOptions}
            />
          </div>
          <div className="form__error">{state.errors.name}</div>
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="description">
            Description
          </label>
          <div className="form__element">
            <textarea
              required
              className="form__textarea"
              name="description"
              defaultValue={state.description}
              cols={28}
              onChange={handleChange}
              onBlur={pickValidateOptions}
            />
          </div>
          <div className="form__error">{state.errors.description}</div>
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="stars">
            Stars
          </label>
          <div className="form__element">
            <input
              required
              className="form__input"
              name="stars"
              defaultValue={state.stars}
              type="number"
              onChange={handleChange}
              onBlur={pickValidateOptions}
            />
          </div>
          <div className="form__error">{state.errors.stars}</div>
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="creator_name">
            Creator name
          </label>
          <div className="form__element">
            <input
              required
              className="form__input"
              name="creator_name"
              defaultValue={state.creator_name}
              type="text"
              onChange={handleChange}
              onBlur={pickValidateOptions}
            />
          </div>
          <div className="form__error">{state.errors.creator_name}</div>
        </div>
        <div className="form__action">
          <button className="form__button">{props.buttonLabel}</button>
        </div>
      </form>
    </div>
  );
};

export default withRouter(RepositoryForm);
