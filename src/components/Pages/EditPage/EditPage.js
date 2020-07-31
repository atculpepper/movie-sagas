import React, { Component } from 'react';
import { connect } from 'react-redux';

import MovieGenresEditor from '../../MovieGenresEditor/MovieGenresEditor';
import Header from '../../Header/Header';

class EditPage extends Component {
  state = {
    title: '',
    description: '',
  };

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

  changeMovieDetails = (fieldKey) => (event) => {
    this.setState({
      [fieldKey]: event.target.value,
    });
  };

  clickCancel = (event) => {
    this.props.history.push(`/details/${this.props.match.params.id}`);
  };

  clickSaveMovieDetails = (event) => {
    // dispatch to saga to make API call
    let newDetails = {
      ...this.state,
      id: this.props.match.params.id,
    };

    if (newDetails.title == null || newDetails.title === '') {
      newDetails.title = this.props.store.details.title;
    }

    if (newDetails.description == null || newDetails.description === '') {
      newDetails.description = this.props.store.details.description;
    }

    this.props.dispatch({
      type: 'PUT_MOVIE',
      payload: newDetails,
    });
    // navigate to the details page
    this.props.history.push(`/details/${this.props.match.params.id}`);
  };

  render() {
    return (
      <div className='algnLeft'>
        <Header title={'Edit'} />

        <h1>Edit</h1>
        <div>
          <button onClick={this.clickCancel}>Cancel</button>
          <button onClick={this.clickSaveMovieDetails}>Save</button>
        </div>
        <div>
          <div>
            <input
              type='text'
              placeholder='New Title'
              onChange={this.changeMovieDetails('title')}
              defaultValue={this.props.store.details.title}
            />
          </div>
          <div>
            <textarea
              onChange={this.changeMovieDetails('description')}
              defaultValue={this.props.store.details.description}
            ></textarea>
          </div>
        </div>
        <MovieGenresEditor movieId={this.props.match.params.id} />
      </div>
    );
  }
}

const mapStoreToProps = (store) => ({ store });

export default connect(mapStoreToProps)(EditPage);
