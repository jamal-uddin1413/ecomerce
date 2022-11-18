import { initializeApp } from 'firebase/app';
import { getAuth, signOut, signInWithEmailAndPassword, updateProfile, signInWithPopup, createUserWithEmailAndPassword, getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import FirebaseConfig from '../../Firebase.config';
const app = initializeApp(FirebaseConfig);
const auth = getAuth(app);
export const initializeFramework = () =>{
    const app = initializeApp(FirebaseConfig);
}

export const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    
    return signInWithPopup(auth, provider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const signInUser = {
          isSignedIn: true,
          name: displayName,
          photo: photoURL,
          email: email,
          password: ''
        }
        return signInUser;
        
        console.log(displayName, photoURL, email)
      })
    console.log('sign in clicked')
  }

 export const handleSignOut = () => {
   return signOut(auth).then(() => {
      const signOutUser = {
        isSignedIn: false,
        name: '',
        photo: '',
        email: ''
      }
      return signOutUser;
      
    })
  };

 export const updateUserName = (name) => {

    updateProfile(auth.currentUser, {
      displayName: name,

    }).then(() => {
      console.log('user name updated', name)
    }).catch((error) => {
      console.log(error)
    });
  }

export const createUserWithEmailAndPassword2 = (name, email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      // Signed in 
      const user = res.user;
      const newUserInfo = user;
      newUserInfo.error = '';
      newUserInfo.Success = true;
      updateUserName(name);
      return newUserInfo;
      
      
    
    })
    .catch((error) => {
      const newUserInfo = {};
      const errorCode = error.code;
      const errorMessage = error.message;
      newUserInfo.Error = errorMessage;
      newUserInfo.Success = false;
      return newUserInfo;
      console.log(errorMessage)
      // ..
    });
}

export const signInWithEmailAndPassword2  = (email, password) =>{
   return signInWithEmailAndPassword(auth, email, password)
.then((res) => {
  // Signed in 
  const user = res.user;
  const newUserInfo = user;
  newUserInfo.error = '';
  newUserInfo.Success = true;
  return newUserInfo;
  
  
  // ...
})
.catch((error) => {
  const newUserInfo = {};
  const errorCode = error.code;
  const errorMessage = error.message;
  newUserInfo.Error = errorMessage;
  newUserInfo.Success = false;
  return newUserInfo;
});
}
