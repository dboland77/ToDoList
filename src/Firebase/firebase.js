import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCvf8V4AzAWzVy1UyR_nRBUMBKkO5Zjx84",
  authDomain: "shoppinglist-f036b.firebaseapp.com",
  databaseURL:
  "https://shoppinglist-f036b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shoppinglist-f036b",
  storageBucket: "shoppinglist-f036b.appspot.com",
  messagingSenderId: "465083849232",
  appId: "1:465083849232:web:c90671100b60a04d654895",
  measurementId: "G-RJKGRW33GD",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
