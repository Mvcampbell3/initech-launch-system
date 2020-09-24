import React from 'react'
import {Link} from 'react-router-dom'
import "./NavDrop.css"


const NavDrop = () => {
    return (
        <div className="menuDrops">
            <Link to="/" className='dropdown-item'>Home</Link>
            <Link to="/store" className='dropdown-item'>Products</Link>
            <Link to="/" className='dropdown-item'>Account</Link>
        </div>
    )
}

export default NavDrop
