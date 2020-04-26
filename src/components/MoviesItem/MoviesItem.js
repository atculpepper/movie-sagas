import React, { Component } from "react";
import { connect } from "react-redux";

class MoviesItem extends Component {
  detailsItem = () => {
    this.props.dispatch({
      type: "GET_DETAILS",
      payload: `/movies/${this.props.moviesItem.id}`,
    });
  };

  render() {
    return (
      <li>
        {this.props.moviesItem.name}
        {this.props.moviesItem.title}
        {this.props.moviesItem.description}
        {this.props.moviesItem.poster}
        <button onClick={this.detailsItem}>Details</button>
      </li>
    );
  }
}

export default connect()(MoviesItem);
