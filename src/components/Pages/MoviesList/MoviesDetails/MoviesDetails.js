import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../../../Header/Header.js";

class MoviesDetails extends Component {
  componentDidMount() {
    // clickList = () => {
    this.props.dispatch({
      type: "GET_GENRES",
      payload: this.props.match.params.id,
    });
    this.props.dispatch({
      type: "GET_DETAILS",
      payload: this.props.match.params.id,
    });
    // this.props.history.push("/movies");
  }

  clickEditMovie = (event) => {
    this.props.history.push(`/edit/${this.props.match.params.id}`);
  };

  clickBackToList = (event) => {
    this.props.history.push("/");
  };

  render() {
    //I want to include genre information here, but I will need to join the genres that were returned in an array within an array
    return (
      <div className="detailsBody">
        <Header />
        <div>
          <button className="btn" onClick={this.clickBackToList}>
            Back to List
          </button>
          <button className="btn" onClick={this.clickEditMovie}>
            Edit Movie
          </button>
        </div>
        <div>
          <p>Details</p>
          <h3>Title: {this.props.store.details.title}</h3>
          <p>Description: {this.props.store.details.description}</p>
        </div>
        <ul>
          {this.props.store.genres.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStoreToProps = (store) => ({
  store,
});

export default connect(mapStoreToProps)(MoviesDetails);
