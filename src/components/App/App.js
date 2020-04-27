import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MoviesList from "../MoviesList/MoviesList";
import MoviesItem from "../MoviesItem/MoviesItem";
import MoviesDetails from "../MoviesDetails/MoviesDetails";
import MoviesEdit from "../MoviesEdit/MoviesEdit";

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <Router>
        <div className="App">
          <p>MOVIE SAGAS</p>

          <div className="routes">
            <Route exact path="/" Component={MoviesList} />
            <Route exact path="/details/:id" Component={MoviesDetails} />
            <Route exact path="/edit/:id" Component={MoviesEdit} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
