import React, { Component } from "react";
import { connect } from "react-redux";
import "./MoviesItem.css";
import Grid from "@material-ui/core/Grid";

class MoviesItem extends Component {
  detailsItem = () => {
    this.props.dispatch({
      type: "GET_DETAILS",
      payload: `/movies/${this.props.moviesItem.id}`,
    });
  };

  render() {
    return (
      <div>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item>
            <h2>{this.props.moviesItem.title}</h2>
          </Grid>
          <Grid item>
            <img
              margin="auto"
              display="block"
              maxWidth="100%"
              maxHeight="100%"
              src={this.props.moviesItem.poster}
            />
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
