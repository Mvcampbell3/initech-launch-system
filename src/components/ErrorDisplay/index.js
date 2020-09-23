import React from 'react';
import './errorDisplay.css';
import Button from '@material-ui/core/Button';

const ErrorDisplay = (props) => {
  return (
    <div className="error-container">
      <div className="error-wrapper">
        <div className="error-top">
          <h3 className="error-title">Opps! Something went wrong...</h3>
        </div>
        <div className="error-body">
          {props.errorMessages.map(message => (
            <p>{message.message}</p>
          ))}
        </div>
        <div className="error-action">
          <Button variant='contained' onClick={props.clearErrors} color='primary'>Close</Button>
        </div>
      </div>
    </div>
  );
}

export default ErrorDisplay;