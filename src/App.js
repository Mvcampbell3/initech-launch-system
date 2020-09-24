import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// pages
import Landing from './pages/Landing';
import Store from './pages/Store';
import Testing from './pages/Testing';
// components

/*

  We are going to be having the majority of important life-cycle state live inside of App.js, things like
  user status, loading, error-management, and product holding. The majority of these will be part of a bunch of 
  useState hooks and useEffect hooks. We are also going to use some useMemo and useRef to hold on to things we need to
  interact with and not cause re-rendering. It's gonna be fun!

  After we get some more basic front-end stuff done, we will jump into firebase interactions and stripe. When we get there, it might be
  better to get together or have a zoom call to talk about what we are going to be doing.

*/

function App() {
  const [displayError, setDisplayError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const setErrors = (messages) => {
    setDisplayError(true);
    setErrorMessages(messages);
  }

  const clearErrors = () => {
    setDisplayError(false);
    setErrorMessages([]);
  }

  return (
    <Router>
      <Switch>
        <Route exact path='/' render={props => <Landing {...props} />} />
        <Route exact path='/test' render={props => <Testing {...props} />} />
        <Route exact path='/store' render={props => <Store
          {...props}
          displayError={displayError}
          errorMessages={errorMessages}
          setErrors={setErrors}
          clearErrors={clearErrors}
        />} />
      </Switch>
    </Router>
  );
}

export default App;
