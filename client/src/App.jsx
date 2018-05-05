import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import LoginPageContainer from './containers/loginPageContainer.jsx';
import LandingPage from './components/landingPage/index.jsx';
import SignupContainer from './containers/signUpContainer.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <main>
            <Switch>
              <Route exact path='/' component={LandingPage} />
<<<<<<< HEAD
              <Route exact path='/signup' component={SignupContainer} />
=======
              <Route exact path='/login' component={LoginPageContainer}/>
>>>>>>> dcb6aca201442d4d8464e05fc4c21c40ac257188
            </Switch>
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(connect(null, null)(App));