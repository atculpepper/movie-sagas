import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App.js";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, combineReducers, applyMiddleware } from "redux";
// Provider allows us to use redux within our react app
import { Provider } from "react-redux";
import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import logger from "redux-logger";
// Import saga middleware
import createSagaMiddleware from "redux-saga";

//get movies from server and store to movies reducer
function* fetchMovies(action) {
  try {
    const response = yield axios.get("/api/movies");

    yield put({ type: "SET_MOVIES", payload: response.data });
  } catch (err) {
    console.warn("error with GET:", err);
  }
}
//get details (including genres) from server and store to genres reducer
//this will rely on a server side many to many table query
function* fetchDetails(action) {
  try {
    const response = yield axios.get(`/api/movies/details/${movieId}`);
    //response.data at index 0
    yield put({ type: "SET_DETAILS", payload: response.data[0] });
  } catch (err) {
    console.warn("error with GET:", err);
  }
}

// Create the rootSaga generator function -- register all sagas here
function* rootSaga() {
  //takeLatest?
  yield takeEvery("GET_MOVIES", fetchMovies);
  yield takeEvery("GET_DETAILS", fetchDetails);
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return action.payload;
    default:
      return state;
  }
};

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case "SET_DETAILS":
      return action.payload;
    default:
      return state;
  }
};

//this reducer receives an object, so it is perfect for getting details that include aggregated genre data
const movies_genres = (state = {}, action) => {
  switch (action.type) {
    case "SET_DETAILS":
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

    movies_genres,
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
  document.getElementById("root")
);
registerServiceWorker();
