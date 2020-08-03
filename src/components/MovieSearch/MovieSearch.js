import React, { Component } from 'react';
import { Connect } from 'react-redux';

class MovieSearch extends Component {
  changeSearch = (event) => {
    this.props.dispatch({
      type: 'SET_SEARCH',
      payload: event.target.value,
    });
  };
  render() {
    return (
      <input placeholder='Search' type='text' onChange={this.changeSearch} />
    );
  }
}

export default Connect()(MovieSearch);
