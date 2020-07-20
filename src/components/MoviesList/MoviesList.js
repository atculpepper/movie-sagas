import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//material ui components
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

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
      <div>
        <Header title='Movie Database' />
        <h2>Movie Database</h2>
        {this.props.store.movies.map((item, index) => (
          <div
            key={index}
            className='movieListItem'
            onClick={(event) => this.clickMovieDetails(event, item.id)}
          >
            <img src={item.poster} alt={item.title} />
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    store,
  };
};
export default withRouter(connect(mapStoreToProps)(MoviesList));
