import React from 'react';
import "./Nav.css"

const Nav = () => {
    return (
        <div className='navigation'>
            <div className="logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg" alt="logo"/>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li>
                        <a href="/">Rockets</a>
                        <div className="dropdown-content">
                            <ul className="dropdown-list">
                                <li className="dropdown-item">
                                    <a href="/">Rocket Stuff</a>
                                </li>
                                <li className="dropdown-item">
                                    <a href="/">Rocket Stuff</a>
                                </li>
                                <li className="dropdown-item">
                                    <a href="/">Rocket Stuff</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a href="/">Rovers</a>
                    </li>
                    <li>
                        <a href="/">Pricing</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Nav
