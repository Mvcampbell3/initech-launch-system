import React from 'react';
import './store.css';
import Nav from '../../components/Nav/Nav';
import NavDrop from '../../components/Nav/NavDrop'
import ErrorDisplay from '../../components/ErrorDisplay';

const Store = (props) => {

  return (
    <div className="store-container">
      {/* Each page we make will have to have an error display component */}
      {props.displayError ? <ErrorDisplay errorMessages={props.errorMessages} clearErrors={props.clearErrors} /> : null}
      <Nav />
      <NavDrop />
    </div>
  );
}

export default Store;