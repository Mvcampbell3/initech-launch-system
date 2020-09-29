import React, { useState, useContext } from 'react';
import './login.css';

import { Redirect } from 'react-router-dom';
import { FirebaseContext } from '../../utils/firebase';
import InputGroup from '../../components/InputGroup';
import Button from '@material-ui/core/Button';
import ErrorDisplay from '../../components/ErrorDisplay';
import Collapse from '@material-ui/core/Collapse';

const Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [actionLogin, setActionLogin] = useState(true);
  const [redirectStore, setRedirectStore] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const firebase = useContext(FirebaseContext);
  const auth = firebase.auth();
  const db = firebase.database();

  const handleSignup = () => {
    if (!name) {
      props.setErrors([{ code: '404', message: 'Please enter a name' }]);
      setDisableButton(false);
      return;
    }
    console.log('would sign up');
    auth.createUserWithEmailAndPassword(email.trim(), password.trim())
      .then((_user) => {
        console.log(_user.user.uid);
        db.ref(`users/${_user.user.uid}`).set({
          email: email.trim(),
          name: name.trim()
        })
          .then(() => {
            console.log('user created');
            setRedirectStore(true);
          })
          .catch(err => {
            console.log('error creating user db');
            console.log(err);
            props.setErrors([{ code: err.code, message: err.message }]);
            setDisableButton(false);
          })

      })
      .catch(err => {
        console.log('error create user auth');
        console.log(err);
        props.setErrors([{ code: err.code, message: err.message }]);
        setDisableButton(false);
      })
  }

  const handleLogin = () => {
    console.log('would log in');
    auth.signInWithEmailAndPassword(email.trim(), password.trim())
      .then((user) => {
        console.log(user);
        setRedirectStore(true);
      })
      .catch(err => {
        console.log(err);
        props.setErrors([{ code: err.code, message: err.message }]);
        setDisableButton(false);
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    console.log(actionLogin);
    if (email && password) {
      setDisableButton(true);
      actionLogin ? handleLogin() : handleSignup();
    } else {
      props.setErrors([{ code: 404, message: 'Please make sure to fill in email and password' }])
    }
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {redirectStore ? <Redirect to='/store' /> : null}
        {props.displayError ? <ErrorDisplay errorMessages={props.errorMessages} clearErrors={props.clearErrors} /> : null}
        <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
          <h2 className="login-title">{actionLogin ? "Login" : "Create Account"}</h2>
          <InputGroup value={email} setValue={setEmail} type='email' label='Email' id='email' placeholder='example@email.com' auto_complete='email' />
          <Collapse in={!actionLogin}>
            <InputGroup value={name} setValue={setName} type='text' label='Name' id='name' placeholder='John Doe' auto_complete='name' />
          </Collapse>
          <InputGroup
            value={password}
            setValue={setPassword}
            type='password'
            label='Password'
            placeholder='********'
            id='password'
            auto_complete={actionLogin ? 'current-password' : 'new-password'}
          />
          <div className="login-button-holder">
            <Button disabled={disableButton} variant='contained' color='primary' type='submit'>{actionLogin ? "Login" : "Sign Up"}</Button>
            <Button variant='text' color='primary' onClick={(e) => setActionLogin(!actionLogin)}>{actionLogin ? "Need to sign up?" : "Already a member?"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;