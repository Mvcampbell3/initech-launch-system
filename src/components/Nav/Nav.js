import React, {useState} from 'react';
import "./Nav.css"

const Nav = () => {

    
    const [menuToggle, setMenuToggle] = useState(false);

    return (
        <div className="container">
            <div className={`navigation ${menuToggle ? "change" : ""}`}  onClick={() => setMenuToggle(!menuToggle)}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
        </div>
        

    );
}

export default Nav

