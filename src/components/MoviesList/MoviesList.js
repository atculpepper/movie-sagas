import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MoviesListItem from '../MoviesListItem/MoviesListItem';

class MoviesList extends Component {
  state = {
    searchTerm: '',
  };

  componentDidMount() {
    // load up all information from the server
    this.props.dispatch({
      type: 'GET_MOVIES',
    });
  }

  clickMovieDetails = (event, id) => {
    this.props.history.push(`/details/${id}`);
  };

  changeSearch = (event) => {
    this.setState({
      searchTerm: event.target.value,
    });
  };

  render() {
    let limitedResults = this.props.store.movies.filter((item, index) => {
      const lowerTitle = item.title.toLowerCase();

      if (this.state.searchTerm) {
        return lowerTitle.indexOf(this.state.searchTerm.toLowerCase()) !== -1;
      }

      return true;
    });

    limitedResults = limitedResults.filter((item, index) => {
      return index < 10;
    });

    return (
      <div className='algnLeft'>
        <input placeholder='Search' type='text' onChange={this.changeSearch} />
        {limitedResults.map((item, index) => (
          <MoviesListItem key={index} item={item} />
        ))}
      </div>
    );
  }
}

const mapStoreToProps = (store) => ({ store });

export default withRouter(connect(mapStoreToProps)(MoviesList));
