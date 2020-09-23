import React, { useEffect } from 'react';
import './store.css';
import Nav from '../../components/Nav';
import ErrorDisplay from '../../components/ErrorDisplay';

const Store = (props) => {

  useEffect(() => {
    props.setErrors([{ code: 122, message: 'This is just a test error, it comes from the useEffect hook inside of the store page' }])
  }, [])

  return (
    <div className="store-container">
      {/* Each page we make will have to have an error display component */}
      {props.displayError ? <ErrorDisplay errorMessages={props.errorMessages} clearErrors={props.clearErrors} /> : null}
      <Nav />
    </div>
  );
}

export default Store;