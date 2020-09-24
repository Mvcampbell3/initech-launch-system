import React, { useEffect, useContext, useRef } from 'react';
import './testing.css';

import { FirebaseContext } from '../../utils/firebase';
import 'firebase/database';
import 'firebase/auth';

import Button from '@material-ui/core/Button';


const Testing = (props) => {

  const firebase = useContext(FirebaseContext);
  const user = useRef(false);
  const db = firebase.database();
  const auth = firebase.auth();

  useEffect(() => {
    db.ref('test').on('value', (snap) => {
      console.log(snap.val())
    })
  }, [db])

  useEffect(() => {
    console.log(auth);
    auth.onAuthStateChanged(userAuth => {
      console.log(userAuth);
      user.current = userAuth;
    })
  }, [auth])

  const makeStuff = () => {
    console.log(user.current);
    const ref = db.ref('new');
    ref.set('what')
      .then(() => {
        console.log('made');
      })
      .catch(err => {
        console.log(err);
      })
  }

  const signUp = () => {
    const email = 'mvcampbell3@gmail.com';
    const password = '12341234';
    auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const logIn = () => {
    const email = 'mvcampbell3@gmail.com';
    const password = '12341234';
    auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const logOut = () => {
    auth.signOut();
  }

  return (
    <div className="testing-container">
      <Button className="btn" variant='contained' color='primary' onClick={makeStuff}>Make</Button>
      <Button className='btn' variant='contained' color='primary' onClick={signUp}>Sign Up</Button>
      <Button className='btn' variant='contained' color='secondary' onClick={logOut}>Log Out</Button>
      <Button className='btn' variant='contained' color='primary' onClick={logIn}>Log In</Button>
    </div>
  );
}

export default Testing;