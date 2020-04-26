import React, { Component } from "react";
import { connect } from "react-redux";
import MoviesItem from "../MoviesItem/MoviesItem";

class MoviesList extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "GET_MOVIES" });

    // use component did mount to dispatch an action to request the plantList from the API
  }

  render() {
    return (
      <div>
        <h3>This is the movies list</h3>
        <ul>
          {this.props.reduxState.movies.map((moviesItem) => {
            return <MoviesItem key={moviesItem.id} moviesItem={moviesItem} />;
          })}
        </ul>
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});
export default connect(mapReduxStateToProps)(MoviesList);
