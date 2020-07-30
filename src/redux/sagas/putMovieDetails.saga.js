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
      type: 'GET_GENRES', //GET_MOVIE_GENRES?
      payload: movieID,
    });
  } catch (err) {
    console.warn(err);
  }
}
