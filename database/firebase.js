import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBYJFEifQvVr1L_3WcPjNEwGaJBve7z8mk",
  authDomain: "empapp-504a4.firebaseapp.com",
  // databaseUrl:  "https://empapp-504a4.firebaseio.com",
  projectId: "empapp-504a4",
  storageBucket: "empapp-504a4.appspot.com",
  messagingSenderId: "118649508836",
  appId: "1:118649508836:web:8a2bd14cd6ce42b7786df1",
  measurementId: "G-030HD2WQM4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db,
}