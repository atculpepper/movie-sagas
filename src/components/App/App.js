import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
          <div ClassName="routes">
            <Route exact path="/" component={MoviesList} />
            <Route exact path="/details" component={MoviesDetails} />
            <Route exact path="/edit" component={MoviesEdit} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
