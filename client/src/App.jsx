import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import LandingPage from './components/landingPage/index.jsx';

class App extends Component {

  render() {
    return (
      <div>
        <main>
          <Switch>
            <Route exact path='/' component={LandingPage} />
          </Switch>
        </main>
      </div>
    )
  }
}

export default withRouter(connect(null, null)(App));