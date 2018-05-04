import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import LandingPage from './components/landingPage/index.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <main>
            <Switch>
              <Route exact path='/' component={LandingPage} />
              
            </Switch>
          </main>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(connect(null, null)(App));