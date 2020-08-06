import React, { Component } from 'react';
import { connect } from 'react-redux';

//material ui components
import Chip from '@material-ui/core/Chip';
// import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

class MovieGenreItem extends Component {
  clickDeleteGenre = (event) => {
    // dispatch to a saga for deleting genre from database
    this.props.dispatch({
      type: 'DELETE_MOVIE_GENRE',
      payload: {
        movieGenreId: this.props.item.id,
        movieId: this.props.item.movies_id,
      },
    });
  };

  render() {
    const { item } = this.props;
    return (
      <li>
        <Chip label={item.name}></Chip>
        <IconButton onClick={this.clickDeleteGenre}>
          <DeleteIcon fontSize='small' />
        </IconButton>
      </li>
    );
  }
}

const mapStateToProps = (store) => ({ store });
export default connect(mapStateToProps)(MovieGenreItem);
