import React, { Component } from "react";
import "./FormComponent.css";
import { withRouter } from "react-router";

class RepositoryFormComponent extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const name = this.getName.value;
    const description = this.getDescription.value;
    const stars = this.getStars.value;
    const creator_name = this.getCreatorName.value;
    const created_at = this.getCreatedAt.value;
    this.props.handleSubmit(name, description, stars, creator_name, created_at);
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="form__container">
        <form onSubmit={this.handleSubmit}>
          <div className="form__row">
            <label className="form__label" htmlFor="name">
              Name
            </label>
            <input
              required
              className="form__input"
              ref={(input) => (this.getName = input)}
              id="name"
              defaultValue={this.props.name}
              type="text"
            />
          </div>
          <div className="form__row">
            <label className="form__label" htmlFor="description">
              Description
            </label>
            <textarea
              required
              className="form__textarea"
              ref={(input) => (this.getDescription = input)}
              id="description"
              defaultValue={this.props.description}
              cols="28"
            />
          </div>
          <div className="form__row">
            <label className="form__label" htmlFor="stars">
              Stars
            </label>
            <input
              required
              className="form__input"
              ref={(input) => (this.getStars = input)}
              id="stars"
              defaultValue={this.props.stars}
              type="number"
            />
          </div>
          <div className="form__row">
            <label className="form__label" htmlFor="creator_name">
              Creator name
            </label>
            <input
              required
              className="form__input"
              ref={(input) => (this.getCreatorName = input)}
              defaultValue={this.props.creator_name}
              type="text"
            />
          </div>
          <input
            type="hidden"
            ref={(input) => (this.getCreatedAt = input)}
            value={this.props.created_at}
          />
          <div className="form__row">
            <button className="form__button" onClick={this.redirectMainPage}>
              {this.props.buttonLabel}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(RepositoryFormComponent);
