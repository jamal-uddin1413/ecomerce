import React from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, signInWithEmailAndPassword, updateProfile, signInWithPopup, createUserWithEmailAndPassword, getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import { useState } from 'react';
import FirebaseConfig from '../../Firebase.config';
import { useContext } from 'react';
import { userContext } from '../../App';
import './Login.css'
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const [LoggedInUser, setLoggedInUser] = useContext(userContext);
  // console.log(LoggedInUser);
  const app = initializeApp(FirebaseConfig);
  let navigate = useNavigate();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const auth = getAuth(app);
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


  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const signInUser = {
          isSignedIn: true,
          name: displayName,
          photo: photoURL,
          email: email,
          password: ''
        }
        setUser(signInUser);
        setLoggedInUser(signInUser);
        console.log(displayName, photoURL, email)
      })
    console.log('sign in clicked')
  }

  const handleSignOut = () => {
    signOut(auth).then(() => {
      const signOutUser = {
        isSignedIn: false,
        name: '',
        photo: '',
        email: ''
      }
      setUser(signOutUser);
      setLoggedInUser(signOutUser);
      console.log(auth)
    })
  };


  const updateUserName = (name) => {

    updateProfile(auth.currentUser, {
      displayName: name,

    }).then(() => {
      console.log('user name updated', name)
    }).catch((error) => {
      console.log(error)
    });
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

      createUserWithEmailAndPassword(auth, user.Email, user.Password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.Success = true;
          setUser(newUserInfo);
          updateUserName(user.Name)
          console.log(user)
        
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          const errorCode = error.code;
          const errorMessage = error.message;
          newUserInfo.Error = errorMessage;
          newUserInfo.Success = false;
          setUser(newUserInfo)
          console.log(errorMessage)
          // ..
        });


    }
    if (!newUser) {
      signInWithEmailAndPassword(auth, user.Email, user.Password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.Success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          navigate(from);
          // ...
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          const errorCode = error.code;
          const errorMessage = error.message;
          newUserInfo.Error = errorMessage;
          newUserInfo.Success = false;
          setUser(newUserInfo)
        });

    }
    e.preventDefault();
  }

  return (
    <div>
      {
        user.isSignedIn ? <button className='Login-btn' onClick={handleSignOut}>Sign Out</button> :
          <button className='Login-btn' onClick={handleGoogleSignIn}>Sign In</button>
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