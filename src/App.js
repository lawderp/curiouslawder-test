import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import AgentSearch from './AgentSearch';


// const AgentSearch = () => <h1>Agent Search</h1>

const Links = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/agentSearch">Agent search</Link>
  </nav>
)


class App extends Component {
  render() {
    return (
      <Router >
        <div>
          <Links />
          <Route exact path="/" render={() => <h1>Home</h1>} />
          <Route path="/agentSearch" component={AgentSearch} />
        </div>
      </Router>
    );
  }
}

export default App;
