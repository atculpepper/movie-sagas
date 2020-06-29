import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../../../Header/Header";

class EditPage extends Component {
  state = {
    title: "",
    description: "",
  };

  componentDidMount() {
    // dispatch to saga to call server API
    this.props.dispatch({
      type: "GET_MOVIE",
      payload: this.props.match.params.id,
    });
    this.props.dispatch({
      type: "GET_GENRES",
      payload: this.props.match.params.id,
    });
  }

  changeMovieDetails = (fieldKey) => (event) => {
    this.setState({
      [fieldKey]: event.target.value,
    });
  };

  clickCancel = (event) => {
    this.props.history.push(`/details/${this.props.match.params.id}`);
  };

  clickSaveMovieDetails = (event) => {
    // dispatch to saga to make API call
    let newDetails = {
      ...this.state,
      id: this.props.match.params.id,
    };

    if (newDetails.title == null || newDetails.title === "") {
      newDetails.title = this.props.store.details.title;
    }

    if (newDetails.description == null || newDetails.description === "") {
      newDetails.description = this.props.store.details.description;
    }

    this.props.dispatch({
      type: "PUT_MOVIE",
      payload: newDetails,
    });
    // navigate to the details page
    this.props.history.push(`/details/${this.props.match.params.id}`);
  };

  render() {
    return (
      <div className="algnLeft">
        <Header />
        <h2>Edit Title and Description</h2>
        <div>
          <button className="btn" onClick={this.clickCancel}>
            Cancel
          </button>
          <button className="btn" onClick={this.clickSaveMovieDetails}>
            Save
          </button>
        </div>

        <div>
          <div>
            <input
              className="textField"
              type="text"
              placeholder="New Title"
              onChange={this.changeMovieDetails("title")}
            />
          </div>
          <div>
            <textarea
              className="textField"
              placeholder="New Description"
              onChange={this.changeMovieDetails("description")}
            ></textarea>
          </div>
        </div>

        <h2>Genres</h2>
        <ul>
          {this.props.store.genres.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStoreToProps = (store) => ({ store });

export default connect(mapStoreToProps)(EditPage);
