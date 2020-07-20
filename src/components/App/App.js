import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route } from 'react-router-dom';

//page components
import HomePage from '../Pages/HomePage/HomePage';
import DetailsPage from '../Pages/DetailsPage/DetailsPage';
import EditPage from '../Pages/EditPage/EditPage';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className='App'>
        <Router>
          <Route exact path='/' component={HomePage} />
          <Route path='/details/:id' component={DetailsPage} />
          <Route path='/edit/:id' component={EditPage} />
        </Router>
      </div>
    );
  }
}

export default App;
