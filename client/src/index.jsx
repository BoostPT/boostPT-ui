import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import { store, persistor } from './store';
import App from './App.jsx';

export const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <App />
      </Router>
    </PersistGate>
  </Provider>
  , document.getElementById('app'));