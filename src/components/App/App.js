import React, { Component } from "react";
import "./App.css";
import { HashRouter as Router, Route } from "react-router-dom";

//page components
import MoviesList from "../MoviesList/MoviesList";
import MoviesDetails from "../MoviesDetails/MoviesDetails";
import MoviesEdit from "../MoviesEdit/MoviesEdit";

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/" component={MoviesList} />
          <Route path="/details/:id" component={MoviesDetails} />
          <Route path="/edit/:id" component={MoviesEdit} />
        </Router>
      </div>
    );
  }
}

export default App;
