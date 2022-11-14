import React from 'react';
import './Header.css';
import logo from '../../Images/logo.png';
import { Link, NavLink } from 'react-router-dom';


const Header = () => {
    return (
        <div className='header'>
             <img src={logo} alt="logo" />
             <nav>
                <NavLink to="/shop">Shop</NavLink>
                <NavLink to="/inventory">inventory</NavLink>
                <NavLink to="/review">Review</NavLink>
                <NavLink to="/login">Login</NavLink>
             </nav>
        </div>
    );
};

export default Header;