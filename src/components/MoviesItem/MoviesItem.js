import React, { Component } from "react";
import { connect } from "react-redux";
import "./MoviesItem.css";
import Grid from "@material-ui/core/Grid";

class MoviesItem extends Component {
  clickDetailsItem = (id) => (event) => {
    //save the value of this.props.moviesItem.id as a constant and then in axios call in generator saga pass the object?
    console.log(this.props.moviesItem.id);
    // const id = this.props.moviesItem.id;

    this.props.dispatch({
      type: "GET_DETAILS",
      payload: this.props.moviesItem.id,
    });
    // include a second dispatch here
    this.props.dispatch({
      type: "GET_MOVIES",
      payload: this.props.moviesItem,
    });

    this.props.history.push(`/details/${id}`); //using back ticks so that I can refer to item.id
  };

  render() {
    const selectedId = this.props.moviesItem.id;
    return (
      <div onClick={this.clickDetailsItem(selectedId)}>
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

          {/* <Grid item>
            <p>{this.props.moviesItem.genres.join(",")}</p>
          </Grid> */}
        </Grid>
      </div>
    );
  }
}

export default connect()(MoviesItem);
