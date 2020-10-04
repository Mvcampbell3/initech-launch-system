import React, { useState, useRef, useEffect } from 'react';
import './textArea.css';

const TextArea = (props) => {

  const [focused, setFocused] = useState(false);
  const focusRef = useRef(null)
  const _value = props.value;

  useEffect(() => {
    if (focused) {
      focusRef.current.focus();
    }
  }, [focused, focusRef])

  useEffect(() => {
    if (_value === '') {
      focusRef.current.value = '';
    }
  }, [_value])

  const handleLabelClick = () => {
    if (!focused) {
      setFocused(true);
    }
  }

  const handleBlur = () => {
    props.value === '' ? setFocused(false) : setFocused(true);
  }

  return (
    <div className="text-area-holder">
      <p htmlFor={props.id} onClick={handleLabelClick} className={!focused ? 'text-area-label' : 'text-area-label text-area-label--focused'}>{props.label}</p>
      <textarea ref={focusRef} className='text-area' id={props.id} onChange={e => props.setValue(e.target.value)} onFocus={e => setFocused(true)} onBlur={handleBlur}></textarea>
    </div>
  );
}

export default TextArea;