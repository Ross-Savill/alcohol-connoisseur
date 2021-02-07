import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDe3p1j8dZPBHt7O-yrIgZtEocrLomS620",
  authDomain: "drink-and-rate.firebaseapp.com",
  projectId: "drink-and-rate",
  storageBucket: "drink-and-rate.appspot.com",
  messagingSenderId: "406161003770",
  appId: "1:406161003770:web:3022aa9d85f93ab863a543",
  measurementId: "G-45X54WBV6E"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const storage = firebase.storage();

export {
  storage, firebase as default
}
