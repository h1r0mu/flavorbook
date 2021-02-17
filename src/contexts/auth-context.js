import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase.js";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    const actionCodeSettings = {
      url: process.env.REACT_APP_MAIL_URL + "?email=" + email,
    };

    return auth.sendPasswordResetEmail(email, actionCodeSettings);
  }

  function sendEmailVerification() {
    const actionCodeSettings = {
      uel: process.env.REACT_APP_MAIL_URL + "start",
    };

    return currentUser.sendEmailVerification(actionCodeSettings);
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    sendEmailVerification,
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
