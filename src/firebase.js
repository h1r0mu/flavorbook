import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAsVpb8we6Mhl0n-GWhLqQnjlLCFNiHKhA",
  authDomain: "coffee-flavors-5c147.firebaseapp.com",
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: "coffee-flavors-5c147",
  storageBucket: "coffee-flavors-5c147.appspot.com",
  messagingSenderId: "1027000250984",
  appId: "1:1027000250984:web:6d454a177969df3ffe81dd",

  // REACT_APP_MEASUREMENT_ID= "G-XVQ1ZL0KXW"
  // REACT_APP_MAIL_URL=http://localhost:3000/
};

firebase.initializeApp(firebaseConfig);

var auth_obj = firebase.auth();
var result_db = firebase.firestore();
var storageRef = firebase.storage().ref();

export default firebase;
export const auth = auth_obj;
export const db = result_db;
export const storage = storageRef;
export const beansCollection = db.collection("beans");
