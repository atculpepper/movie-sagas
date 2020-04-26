import React, { Component } from "react";
import { connect } from "react-redux";
import MoviesItem from "../MoviesItem/MoviesItem";

class MoviesList extends Component {
  componentDidMount() {
    //sends out a call to the rootSaga in index.js, which will redirect the dispatch to a function that will communicate with the server
    this.props.dispatch({ type: "GET_MOVIES" });
  }

  render() {
    const moviesArray = this.props.reduxState.movies.map(
      (moviesItem, index) => {
        return <MoviesItem key={index} moviesItem={moviesItem} />;
      }
    );

    return <div>{moviesArray}</div>;
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});
export default connect(mapReduxStateToProps)(MoviesList);
