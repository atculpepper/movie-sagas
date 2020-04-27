import React, { Component } from "react";
import { connect } from "react-redux";
import "./MoviesItem.css";
import Grid from "@material-ui/core/Grid";

class MoviesItem extends Component {
  detailsItem = () => {
    this.props.dispatch({
      type: "GET_DETAILS",
      payload: this.props.moviesItem,
    });
    //include a second dispatch here
    this.props.dispatch({
      type: "GET_MOVIES",
      payload: this.props.moviesItem,
    });

    this.props.history.push("/details/:id");
  };

  render() {
    return (
      <div onClick={this.detailsItem}>
        <Grid
        // container
        // direction="row"
        // justify="space-evenly"
        // alignItems="center"
        >
          <Grid item>
            <h2>{this.props.moviesItem.title}</h2>
          </Grid>
          <Grid item>
            <img src={this.props.moviesItem.poster} />
          </Grid>
          <Grid item>
            <p>{this.props.moviesItem.description}</p>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect()(MoviesItem);
