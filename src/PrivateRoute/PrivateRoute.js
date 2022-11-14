import React, { useContext } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate,  } from 'react-router-dom';
import { Location, } from 'react-router-dom';
import { userContext } from '../App';



const PrivateRoute = ({  children, ...rest }) => {
  const [LoggedInUser, setLoggedInUser] = useContext(userContext);
  let location = useLocation();
  return LoggedInUser.email ? children : <Navigate to="/login"  state={{ from:location}}/>;
    
};

export default PrivateRoute;