import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../Header/Header';
// import MovieSearch from '../../MovieSearch/MovieSearch';

//material ui components
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

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
          <Button onClick={this.clickEditMovie} variant='contained'>
            Edit
          </Button>
        </Header>
        <Container>
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
        </Container>
      </div>
    );
  }
}

const mapStoreToProps = (store) => ({ store });

export default connect(mapStoreToProps)(DetailsPage);
