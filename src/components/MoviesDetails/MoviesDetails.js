import React, { Component } from "react";
import { connect } from "react-redux";

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

  clickEdit = (event) => {
    this.props.history.push(`/edit/${this.props.match.params.id}`);
  };

  render() {
    //I want to include genre information here, but I will need to join the genres that were returned in an array within an array
    return (
      <div>
        <p>Details</p>
        <h2>Title: {this.props.store.details.title}</h2>
        <p>Description: {this.props.store.details.description}</p>
      </div>
    );
  }
}

const mapStoreToProps = (store) => ({
  store,
});

export default connect(mapStoreToProps)(MoviesDetails);
