import React, { Component } from "react";
import "./FormComponent.css";
import { withRouter } from "react-router";
import {compose} from "redux";
import {connect} from "react-redux";

class NoteFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRepository: "",
    };
  }

  componentDidMount() {
    if (this.props.mode === "add") {
      this.setState({
        selectedRepository: this.props.repositories_info[0].id,
      });
    } else if (this.props.mode === "edit") {
      this.setState({
        selectedRepository: this.props.note[0].related_repository[0].id,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const text = this.getText.value;
    if (this.props.mode === "add") {
      this.props.handleSubmit(this.state.selectedRepository, this.props.isAuth ? this.props.login : null , text);
    } else if (this.props.mode === "edit") {
      this.props.handleSubmit(this.state.selectedRepository, text);
    }
    this.props.history.goBack();
  };

  handleChange = (e) => {
    this.setState({ selectedRepository: e.target.value });
  };

  render() {
    return (
      <div className="form__container">
        <form onSubmit={this.handleSubmit}>
          <div className="form__row">
            <label className="form__label" htmlFor="name">
              Repository
            </label>
            <select className="form__input" onChange={this.handleChange}>
              {this.props.repositories_info.map((info, index) => {
                return (
                  <option
                    title={"id:" + info.id}
                    key={index}
                    value={info.id}
                    selected={info.id === this.state.selectedRepository}
                  >
                    {info.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form__row">
            <label className="form__label" htmlFor="description">
              Text
            </label>
            <textarea
              required
              className="form__textarea"
              ref={(input) => (this.getText = input)}
              id="text"
              defaultValue={this.props.text}
              cols="28"
            />
          </div>
          <div className="form__row">
            <button
              disabled={!this.props.repositories_info.length}
              className="form__button"
            >
              {this.props.buttonLabel}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, {})
)(NoteFormComponent);

