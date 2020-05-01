import React, { Component } from "react";
import { connect } from "react-redux";
import "./MoviesItem.css";
import Grid from "@material-ui/core/Grid";

class MoviesItem extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "GET_DETAILS",
      payload: this.props.match.params.id,
    });
    // include a second dispatch here
    this.props.dispatch({
      type: "GET_GENRES",
      payload: this.props.match.params.id,
    });
  }

  clickBackToDatabase = (event) => {
    this.props.history.push("/");
  };

  clickToEdit = (event) => {
    this.props.history.push(`/edit/${this.props.match.params.id}`);
  };

  render() {
    return (
      <div className="alignLeft">
        <div>
          <button onClick={this.clickBackToDatabase}>Back To Database</button>
          <button onClick={this.clickToEdit}>Edit</button>
        </div>
        <Grid>
          <Grid item>
            <h2>Details</h2>
          </Grid>
          <Grid item>
            <h2>{this.props.store.details.title}</h2>
          </Grid>
          <Grid item>
            <img src={this.props.store.details.poster} />
          </Grid>
          <Grid item>
            <p>{this.props.store.details.description}</p>
          </Grid>

          <ul>
            {this.props.store.genres.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </Grid>
      </div>
    );
  }
}

const mapStoreToProps = (store) => ({ store });

export default connect(mapStoreToProps)(MoviesItem);
