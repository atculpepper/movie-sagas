import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//material ui components
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import MoviesListItem from '../MoviesListItem/MoviesListItem';

class MoviesList extends Component {
  //local state for search
  state = {
    searchTerm: '',
  };
  componentDidMount() {
    this.props.dispatch({ type: 'GET_MOVIES' });

    console.log('the component did in fact mount on MoviesList');
    //sends out a call to the rootSaga in index.js, which will redirect the dispatch to a function that will communicate with the server
  }

  clickMovieDetails = (event, id) => {
    this.props.history.push(`/details/${id}`);
  };

  render() {
    let limitedResults = this.props.store.movies.filter((item, index) => {
      const lowerTitle = item.title.toLowerCase();

      if (this.props.store.search) {
        return lowerTitle.indexOf(this.props.store.search.toLowerCase()) !== -1;
      }

      return true;
    });

    limitedResults = limitedResults.filter((item, index) => {
      return index < 10;
    });

    return (
      <Container maxWidth={false}>
        <Grid container spacing={2}>
          {limitedResults.map((item, index) => (
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <MoviesListItem key={index} item={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    store,
  };
};
export default withRouter(connect(mapStoreToProps)(MoviesList));
