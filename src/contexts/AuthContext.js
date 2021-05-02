import React, { useContext, useEffect, useState } from "react";

import PropTypes from "prop-types";
import { auth } from "../firebase.js";

const AuthContext = React.createContext();
// Contextを作成

export function useAuth() {
  // Contextの現在値を返す
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const [currentUser, setCurrentUser] = useState();

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
      url: process.env.REACT_APP_MAIL_URL + "start",
    };

    return currentUser.sendEmailVerification(actionCodeSettings);
  }

  function updatePassword() {
    return currentUser.updateEmail();
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updateProfile(profiledata) {
    return currentUser.updateProfile(profiledata);
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    sendEmailVerification,
    updatePassword,
    updateEmail,
    updateProfile,
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.element,
};
