import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../Header/Header';
// import MovieSearch from '../../MovieSearch/MovieSearch';

class DetailsPage extends Component {
  componentDidMount() {
    // dispatch to saga to call server API
    this.props.dispatch({
      type: 'GET_MOVIE',
      payload: this.props.match.params.id,
    });
    this.props.dispatch({
      type: 'GET_MOVIE_GENRES',
      payload: this.props.match.params.id,
    });
  }

  clickBackToList = (event) => {
    this.props.history.push('/');
  };

  clickEditMovie = (event) => {
    this.props.history.push(`/edit/${this.props.match.params.id}`);
  };

  render() {
    return (
      <div className='algnLeft'>
        <Header
          title={this.props.store.details.title}
          backHandler={this.clickBackToList}
        >
          <button onClick={this.clickEditMovie}>Edit</button>
        </Header>
        <h2>{this.props.store.details.title}</h2>
        {/* <div>
          <button onClick={this.clickBackToList}>Back to List</button>
        </div> */}
        <p>{this.props.store.details.description}</p>
        <ul>
          {this.props.store.movieGenres.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStoreToProps = (store) => ({ store });

export default connect(mapStoreToProps)(DetailsPage);
