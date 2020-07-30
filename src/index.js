import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';

//SAGAS FOR API CALLS

//get movies from server and store to movies reducer
function* fetchMovies(action) {
  try {
    const response = yield axios.get('/api/movies');

    yield put({ type: 'SET_MOVIES', payload: response.data });
  } catch (err) {
    console.warn('error with GET:', err);
  }
}
//get details (including genres) from server and store to genres reducer
//this will rely on a server side many to many table query
function* fetchDetails(action) {
  try {
    const movieId = action.payload;

    const response = yield axios.get(`/api/movies/details/${movieId}`);
    //response.data at index 0
    yield put({ type: 'SET_DETAILS', payload: response.data[0] });
  } catch (err) {
    console.warn('error with GET:', err);
  }
}

function* getGenres(action) {
  try {
    const movieId = action.payload;
    const response = yield axios.get(`api/movies/genres/${movieId}`);
    yield put({
      type: 'SET_GENRES',
      payload: response.data,
    });
  } catch (err) {
    console.warn(err);
  }
}

//function to edit movie details
function* putMovieDetails(action) {
  try {
    const movieID = action.payload.id;
    yield axios.put(`/api/movies/eit/${movieID}`, action.payload);
    yield put({
      type: 'GET_MOVIE',
      payload: movieID,
    });
    yield put({
      type: 'GET_GENRES',
      payload: movieID,
    });
  } catch (err) {
    console.warn(err);
  }
}

// Create the rootSaga generator function -- register all sagas here
function* rootSaga() {
  //takeLatest?
  yield takeLatest('GET_MOVIES', fetchMovies);
  yield takeLatest('GET_DETAILS', fetchDetails);
  yield takeLatest('GET_GENRES', getGenres);
  yield takeLatest('PUT_MOVIE', putMovieDetails);
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

//REDUCERS abstracted to their own folder under redux

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
};

//this reducer receives an object, so it is good for getting details that include aggregated genre data
const details = (state = {}, action) => {
  switch (action.type) {
    case 'SET_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    details,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
