import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// pages
import Landing from './pages/Landing';
import Store from './pages/Store';
import Testing from './pages/Testing';
import Login from './pages/Login';

// components


// Firebase for App Auth
import { FirebaseContext } from './utils/firebase';

/*

  We are going to be having the majority of important life-cycle state live inside of App.js, things like
  user status, loading, error-management, and product holding. The majority of these will be part of a bunch of 
  useState hooks and useEffect hooks. We are also going to use some useMemo and useRef to hold on to things we need to
  interact with and not cause re-rendering. It's gonna be fun!

  After we get some more basic front-end stuff done, we will jump into firebase interactions and stripe. When we get there, it might be better to get together or have a zoom call to talk about what we are going to be doing.

*/

function App() {
  const [displayError, setDisplayError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [userDB, setUserDB] = useState({});
  const [userID, setUserID] = useState('');
  const [currentCart, setCurrentCart] = useState([]);
  const [products, setProducts] = useState([]);

  const firebase = useContext(FirebaseContext);
  const auth = firebase.auth();
  const db = firebase.database();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log(user);
      user ? setUserID(user.uid) : setUserID('');
    })
  }, [auth, db]);

  useEffect(() => {
    console.log(userID)
    if (userID) {
      const user_ref = db.ref(`users/${userID}`);
      user_ref.on('value', user_db_raw => {
        const user_db = { ...user_db_raw.val(), id: userID }
        console.log(user_db)
        setUserDB(user_db);
        if (user_db.currentCart) {
          console.log('has cart');
        } else {
          console.log('does not have cart');
        }
      })
    }
  }, [userID, db])

  useEffect(() => {
    const products_ref = db.ref('products');
    products_ref.on('value', products_db_raw => {
      const products_db = products_db_raw.val();
      if (products_db) {
        let products_arr = [];
        const num_products = Object.keys(products_db).length;
        for (let prod_id in products_db) {
          const product = { ...products_db[prod_id], id: prod_id };
          products_arr.push(product);
          if (products_arr.length === num_products) {
            console.log(products_arr);
            setProducts(products_arr);
          }
        }
      }
    })
  }, [db])

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
          currentCart={currentCart}
          setCurrentCart={setCurrentCart}
          userDB={userDB}
          products={products}
        />} />
        <Route exact path='/login' render={props => <Login
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
