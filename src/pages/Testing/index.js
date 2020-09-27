import React, { useEffect, useContext, useRef, useState } from 'react';
import './testing.css';

import { FirebaseContext } from '../../utils/firebase';
import 'firebase/database';
import 'firebase/auth';

import Button from '@material-ui/core/Button';
import InputGroup from '../../components/InputGroup';


const Testing = (props) => {

  const firebase = useContext(FirebaseContext);
  const user = useRef(false);
  const db = firebase.database();
  const auth = firebase.auth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    db.ref('test').on('value', (snap) => {
      console.log(snap.val())
    })
  }, [db])

  useEffect(() => {
    console.log(auth);
    auth.onAuthStateChanged(user => {
      console.log(user);
      user.current = user;
      const refP_db = db.ref(`users/${user.uid}`);
      refP_db.once('value', (snap) => {
        console.log(snap.val())
        db.ref('products').once('value', prod_db => {
          console.log(prod_db.val())
          let products_arr = [];
          for (let pd_id in prod_db.val()) {
            products_arr.push({ ...prod_db.val()[pd_id], id: pd_id })
          }
          console.log(products_arr)
          const new_products = [...products_arr].filter(prod => prod.misson === 'LEO');
        })
      })
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
    auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const logIn = () => {
    auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        // console.log(user);

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
      <div className="button-holder">
        <Button className="btn" variant='contained' color='primary' onClick={makeStuff}>Make</Button>
        <Button className='btn' variant='contained' color='primary' onClick={signUp}>Sign Up</Button>
        <Button className='btn' variant='contained' color='secondary' onClick={logOut}>Log Out</Button>
        <Button className='btn' variant='contained' color='primary' onClick={logIn}>Log In</Button>
      </div>
      <div className="input-wrapper">
        <InputGroup value={email} setValue={setEmail} label='Email' type='email' auto_complete='email' placeholder='example@email.com' />
        <InputGroup value={password} setValue={setPassword} label='Password' placeholder='********' type='password' auto_complete='new-password' />
      </div>
    </div>
  );
}

export default Testing;