import React from 'react';
import { auth } from '../firebase';

function Login() {
  const signInWithGoogle = () => {
    const provider = new auth.GoogleAuthProvider();
    auth().signInWithPopup(provider);
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}

export default Login;