import React, { Component } from "react";
import { connect } from "react-redux";

class MoviesDetails extends Component {
  clickList = () => {
    this.props.dispatch({
      type: "GET_MOVIES",
    });
    // this.props.history.push("/movies");
  };

  clickEdit = () => {
    this.props.history.push("/edit/:id");
  };

  render() {
    const moviesItemDetails = this.props.reduxState.genres;
    //I want to include genre information here, but I will need to join the genres that were returned in an array within an array
    return (
      <div>
        <h2>{moviesItemDetails.title}</h2>
        <p>{moviesItemDetails.description}</p>
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(MoviesDetails);
