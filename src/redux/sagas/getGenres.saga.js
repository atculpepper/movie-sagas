function* getGenres(action) {
  try {
    const movieId = action.payload;
    const response = yield axios.get('api/genres');
    yield put({
      type: 'SET_GENRES',
      payload: response.data,
    });
  } catch (err) {
    console.warn(err);
  }
}
