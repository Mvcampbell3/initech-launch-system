import React from 'react';
import './inputGroup.css';

import TextField from '@material-ui/core/TextField';


const InputGroup = (props) => {
  return (
    <div className="input-group">
      <TextField
        className='text-input'
        id={props.id}
        label={props.label}
        placeholder={props.placeholder}
        value={props.value}
        onChange={e => props.setValue(e.target.value)}
        type={props.type}
        autoComplete={props.auto_complete}
      />
    </div>
  );
}

export default InputGroup;