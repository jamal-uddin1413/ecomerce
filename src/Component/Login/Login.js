import React from 'react';

import { useState } from 'react';

import { useContext } from 'react';
import { userContext } from '../../App';
import './Login.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { initializeFramework, handleGoogleSignIn, handleSignOut, signInWithEmailAndPassword2, createUserWithEmailAndPassword2 } from './LoginManager';

const Login = () => {
  const [LoggedInUser, setLoggedInUser] = useContext(userContext);
  // console.log(LoggedInUser);
  initializeFramework();
  let navigate = useNavigate();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  
  const [newUser, setnewUser] = useState();
  const [user, setUser] = useState(
    {
      isSignedIn: false,
      Name: '',
      photo: '',
      Email: '',
      Password: '',
      Error: '',
      Success: false
    }
  )
const googleSignIn = () =>{
  handleGoogleSignIn()
  .then(res => {
    setUser(res);
    setLoggedInUser(res);
    navigate(from);
  })
}
const SignOut = () =>{
  handleSignOut()
  .then(res => {
    setUser(res);
    setLoggedInUser(res)
    
  })
}
  const handleBlur = (e) => {

    let isFielValid = true;
    if (e.target.name === 'Email') {
      isFielValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'Password') {

      const isPasswordValid = (e.target.value.length > 6);
      const isPasswordNumber = /\d{1}/.test(e.target.value)
      isFielValid = (isPasswordValid && isPasswordNumber);
    }
    if (isFielValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {

    if (newUser && user.Name && user.Email) {
      console.log('submit clicked')
      createUserWithEmailAndPassword2(user.Name, user.Email, user.Password)
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        
      })


    }
    if (!newUser) {
      signInWithEmailAndPassword2(user.Email, user.Password)
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        navigate(from);
      })
    }
    e.preventDefault();
  }

  return (
    <div>
      {
        user.isSignedIn ? <button className='Login-btn' onClick={SignOut}>Sign Out</button> :
          <button className='Login-btn' onClick={googleSignIn}>Sign In</button>
      }

      {
        user.isSignedIn &&
        <div>
          <h2>Name : {user.Name}</h2>
          <p>Email : {user.Email}</p>
          <img src={user.Photo} alt="" />
        </div>

      }

      <h1>Our Own Authentication</h1>

      <form action="" onSubmit={handleSubmit}>
        <input type="checkbox" name='newUser' onChange={() => setnewUser(!newUser)} />
        <label htmlFor="newUser">New User Sign Up</label>
        <br />
        {
          newUser && <input type="text" name='Name' onBlur={handleBlur} placeholder='name' required />
        }
        <br />
        <input type="text" name='Email' onBlur={handleBlur} placeholder='email' required />
        <br />
        <input type="password" name='Password' onBlur={handleBlur} placeholder='password' required />
        <br />
        <input type="submit" name='Submit' />
      </form>
      <p style={{ color: 'red' }}>{user.Error}</p>
      {
        user.Success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Loged in '} Succesfully</p>
      }
    </div>
  );
};

export default Login;