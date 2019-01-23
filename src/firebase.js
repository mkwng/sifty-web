import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var config = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: "sifty-organization.firebaseapp.com",
  databaseURL: "https://sifty-organization.firebaseio.com",
  projectId: "sifty-organization",
  storageBucket: "sifty-organization.appspot.com",
  messagingSenderId: "436169085940"
};
firebase.initializeApp(config);

export default firebase;