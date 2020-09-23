import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './landing.css';
import logo from '../../images/logo.png'

const Landing = (props) => {
  const [loadOpac, setLoadOpac] = useState(false);
  const [sendStore, setSendStore] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoadOpac(true);
    }, 1000);
  }, [])


  return (
    <>
      {sendStore ? <Redirect to='/store' /> :
        <div className="landing-container">
          <div className={loadOpac ? "opac-holder opac-up" : "opac-holder"}>
            {loadOpac ? <div className="content-holder">
              <div className="landing-content">
                <div className="landing-content-top">
                  <div className="logo-holder">
                    <img className='landing-logo' src={logo} alt="logo" />
                  </div>
                  <h1 className="main-title">Initech Launch System</h1>
                </div>

                <button className="main-btn landing-button" onClick={(e) => setSendStore(true)}>View Store</button>
              </div>
            </div> : null}

          </div>
        </div>
      }
    </>

  );
}

export default Landing;