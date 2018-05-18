import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LoginPageContainer from './containers/loginPageContainer.jsx';
import LandingPage from './components/landingPage/index.jsx';
import SignupContainer from './containers/signUpContainer.jsx';
import DashPageContainer from './containers/dashPageContainer.jsx';
import BioPageContainer from './containers/bioPage/bioPageContainer.jsx';

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
          <main>
            <Switch>
              <Route exact path='/' component={LandingPage} />
              <Route exact path='/signup' component={SignupContainer} />
              <Route exact path='/login' component={LoginPageContainer}/>
              <Route path='/dash' component={DashPageContainer}/>
              <Route path='/bio' component={BioPageContainer}/>
            </Switch>
          </main>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(connect(null, null)(App));