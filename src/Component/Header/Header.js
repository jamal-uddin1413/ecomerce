import React from 'react';
import './Header.css';
import logo from '../../Images/logo.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../../App';


const Header = () => {
    const [LoggedInUser, setLoggedInUser] = useContext(userContext);
    const navigate = useNavigate();
    const logout = () =>{
        setLoggedInUser({});
    }
    const login = () =>{
        navigate("/login")
    }
    return (
        <div className='header'>
             <img src={logo} alt="logo" />
             <nav>
                <NavLink to="/shop">Shop</NavLink>
                <NavLink to="/inventory">inventory</NavLink>
                <NavLink to="/review">Review</NavLink>
                
                
                {
                    LoggedInUser.email? <button onClick={logout}>Signout</button> : <button onClick={login} className="" >SignIn</button>
                }
                
             </nav>
        </div>
    );
};

export default Header;